/**
 * Thin wrapper over the Google tag.
 *
 * Analytics must never be able to break a form. Every call is a no-op when the
 * tag is absent, which is the normal case in dev, in preview builds, and for
 * any visitor running an ad blocker, and failures are swallowed rather than
 * thrown into the submit path.
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", name, params);
  } catch {
    // Reporting is not worth an interrupted signup.
  }
}
