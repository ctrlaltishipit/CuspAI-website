import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Server functions behind the admin dashboard.
 *
 * Every one of these re-checks the session itself. None of them trust the page
 * that called them, because a server function is a public endpoint: the route
 * component guarding the UI is a convenience for the person, not a control.
 */

export type WaitlistRow = {
  id: string;
  email: string;
  name: string;
  role: string | null;
  source: string | null;
  created_at: string;
};

export type AdminSnapshot = {
  total: number;
  last7: number;
  last24h: number;
  bySource: { source: string; count: number }[];
  rows: WaitlistRow[];
};

export type AdminState =
  | { status: "unconfigured" }
  | { status: "locked" }
  | { status: "ready"; snapshot: AdminSnapshot };

const MAX_ROWS = 1000;

async function buildSnapshot(): Promise<AdminSnapshot> {
  const { getSupabaseAdmin } = await import("./supabase-admin");
  const { data, error } = await getSupabaseAdmin()
    .from("waitlist")
    .select("id,email,name,role,source,created_at")
    .order("created_at", { ascending: false })
    .limit(MAX_ROWS);

  if (error) throw new Error(error.message);

  const rows = (data ?? []) as WaitlistRow[];
  const now = Date.now();
  const within = (hours: number) =>
    rows.filter((r) => now - new Date(r.created_at).getTime() <= hours * 3600_000).length;

  const counts = new Map<string, number>();
  for (const row of rows) {
    const key = row.source ?? "unknown";
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return {
    total: rows.length,
    last7: within(24 * 7),
    last24h: within(24),
    bySource: [...counts.entries()]
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count),
    rows,
  };
}

/** Called by the route loader on every visit. Never throws for the visitor. */
export const loadAdmin = createServerFn({ method: "GET" }).handler(async (): Promise<AdminState> => {
  const { adminIsConfigured, hasValidSession } = await import("./admin-auth");
  if (!adminIsConfigured()) return { status: "unconfigured" };
  if (!(await hasValidSession())) return { status: "locked" };
  try {
    return { status: "ready", snapshot: await buildSnapshot() };
  } catch (error) {
    console.error("admin snapshot failed", error);
    return { status: "locked" };
  }
});

export const adminLogin = createServerFn({ method: "POST" })
  .validator(z.object({ password: z.string().min(1).max(200) }))
  .handler(async ({ data }): Promise<{ ok: boolean }> => {
    const { passwordMatches, startSession } = await import("./admin-auth");
    if (!(await passwordMatches(data.password))) {
      // A uniform delay blunts guessing a little without pretending to be a
      // full rate limiter. The real defence is a long passphrase.
      await new Promise((resolve) => setTimeout(resolve, 600));
      return { ok: false };
    }
    await startSession();
    return { ok: true };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async (): Promise<void> => {
  const { endSession } = await import("./admin-auth");
  endSession();
});
