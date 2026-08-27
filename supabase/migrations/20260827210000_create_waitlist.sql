-- Early-access signups from the marketing site.
--
-- Writes arrive only through the `joinWaitlist` server function, which holds
-- the service-role key. Row-level security is enabled with NO policies, which
-- is deliberate: service_role bypasses RLS, and every other role (anon and
-- authenticated included) therefore has no read or write path to this table.
-- If the anon key ever leaks, the signup list is still unreachable.

create table if not exists public.waitlist (
  id          uuid primary key default gen_random_uuid(),
  email       text        not null,
  name        text        not null,
  role        text,
  -- Which form was used: hero, footer, about, how-it-works.
  source      text,
  created_at  timestamptz not null default now()
);

-- Emails are lowercased by the server function before insert, so a plain
-- unique constraint is enough to make a repeat signup a no-op we can detect.
create unique index if not exists waitlist_email_key
  on public.waitlist (email);

-- Newest-first is the only way this gets read.
create index if not exists waitlist_created_at_idx
  on public.waitlist (created_at desc);

alter table public.waitlist enable row level security;

revoke all on public.waitlist from anon, authenticated;
