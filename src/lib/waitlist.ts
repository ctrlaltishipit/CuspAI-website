import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Early-access signup.
 *
 * Runs as a server function, so the service-role key stays on the server and
 * the CSRF middleware in `src/start.ts` covers the endpoint. The browser only
 * ever sees the result shape below.
 */
const WaitlistInput = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  name: z.string().trim().min(1).max(120),
  role: z.string().trim().max(120).optional(),
  /** Which form on the site was used — hero, footer CTA, about, and so on. */
  source: z.string().trim().max(60).optional(),
});

export type WaitlistResult =
  { ok: true; alreadyJoined: boolean } | { ok: false; reason: "invalid" | "unavailable" };

export const joinWaitlist = createServerFn({ method: "POST" })
  .validator(WaitlistInput)
  .handler(async ({ data }): Promise<WaitlistResult> => {
    const { getSupabaseAdmin } = await import("./supabase-admin");

    try {
      const { error } = await getSupabaseAdmin()
        .from("waitlist")
        .insert({
          email: data.email,
          name: data.name,
          role: data.role || null,
          source: data.source || null,
        });

      if (error) {
        // 23505 = unique_violation. Signing up twice is not a failure worth
        // showing someone — treat it as success and say so gently.
        if (error.code === "23505") return { ok: true, alreadyJoined: true };
        console.error("waitlist insert failed", error);
        return { ok: false, reason: "unavailable" };
      }

      return { ok: true, alreadyJoined: false };
    } catch (error) {
      // Misconfiguration (missing env vars) or network trouble. Logged for us,
      // generic for them — we never leak configuration detail to the client.
      console.error("waitlist submission error", error);
      return { ok: false, reason: "unavailable" };
    }
  });
