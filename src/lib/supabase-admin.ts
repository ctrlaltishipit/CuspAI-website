import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client, holding the service-role key.
 *
 * This key bypasses row-level security, so it must never reach the browser.
 * Two things keep it server-side: the variables are not prefixed `VITE_`, so
 * Vite never inlines them into the client bundle, and this module is only ever
 * imported from a `createServerFn` handler, whose body Start strips from the
 * client build.
 *
 * The client is built lazily rather than at module load so that a missing
 * variable surfaces as a handled error on submit, instead of crashing the
 * whole server at boot.
 */
let cached: SupabaseClient | undefined;

export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const url = process.env["SUPABASE_URL"];
  const serviceRoleKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];

  if (!url || !serviceRoleKey) {
    throw new Error("Supabase is not configured: set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  }

  cached = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
