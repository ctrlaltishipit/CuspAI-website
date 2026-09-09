/**
 * Session handling for the admin dashboard.
 *
 * Server-only. The dashboard shows the waitlist, which is personal data, so it
 * sits behind a passphrase held in ADMIN_PASSWORD and a signed, expiring cookie.
 *
 * Web Crypto is used rather than node:crypto because this app is built for
 * Cloudflare by default and only switches to the Vercel preset in CI. Web
 * Crypto is the one API present in both runtimes.
 *
 * The cookie carries no identity, only an expiry and a signature over it. That
 * is enough while there is a single shared passphrase. When per-person access
 * is added, the payload gains an email and the allowlist is checked here.
 */
import { getCookie, setCookie, deleteCookie } from "@tanstack/react-start/server";

const COOKIE_NAME = "cusp_admin";
const SESSION_SECONDS = 60 * 60 * 12;

function encoder() {
  return new TextEncoder();
}

function base64url(bytes: ArrayBuffer): string {
  const binary = String.fromCharCode(...new Uint8Array(bytes));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * The signing key is derived from the passphrase rather than stored separately.
 * Changing the passphrase therefore invalidates every existing session, which
 * is the behaviour you want from a password change.
 */
async function signingKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder().encode(`cusp-admin-session:${secret}`),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

async function sign(payload: string, secret: string): Promise<string> {
  const key = await signingKey(secret);
  const mac = await crypto.subtle.sign("HMAC", key, encoder().encode(payload));
  return base64url(mac);
}

/** Length-independent comparison, so a mismatch leaks nothing through timing. */
function constantTimeEqual(a: string, b: string): boolean {
  const left = encoder().encode(a);
  const right = encoder().encode(b);
  const length = Math.max(left.length, right.length);
  let diff = left.length ^ right.length;
  for (let i = 0; i < length; i += 1) {
    diff |= (left[i] ?? 0) ^ (right[i] ?? 0);
  }
  return diff === 0;
}

function configuredPassword(): string | undefined {
  const value = process.env["ADMIN_PASSWORD"];
  return value && value.length > 0 ? value : undefined;
}

/** True when the dashboard is usable at all. Without a passphrase it is sealed. */
export function adminIsConfigured(): boolean {
  return configuredPassword() !== undefined;
}

export async function passwordMatches(candidate: string): Promise<boolean> {
  const expected = configuredPassword();
  if (!expected) return false;
  return constantTimeEqual(candidate, expected);
}

export async function startSession(): Promise<void> {
  const secret = configuredPassword();
  if (!secret) return;
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const payload = String(expiresAt);
  const token = `${payload}.${await sign(payload, secret)}`;
  setCookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: SESSION_SECONDS,
  });
}

export function endSession(): void {
  deleteCookie(COOKIE_NAME, { path: "/" });
}

export async function hasValidSession(): Promise<boolean> {
  const secret = configuredPassword();
  if (!secret) return false;

  const token = getCookie(COOKIE_NAME);
  if (!token) return false;

  const separator = token.lastIndexOf(".");
  if (separator <= 0) return false;

  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);

  const expected = await sign(payload, secret);
  if (!constantTimeEqual(signature, expected)) return false;

  const expiresAt = Number(payload);
  return Number.isFinite(expiresAt) && expiresAt > Math.floor(Date.now() / 1000);
}
