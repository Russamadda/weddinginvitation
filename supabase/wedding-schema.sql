-- Run once in your Supabase SQL Editor. Re-running does not delete existing replies.
begin;
create table if not exists public.wedding_invitations (
  id uuid primary key,
  token text unique not null check (token ~ '^[A-Za-z0-9_-]{32}$'),
  body text not null,
  created_at text not null,
  enabled smallint not null default 1 check (enabled in (0, 1)),
  response text,
  responded_at text,
  draft text
);
create table if not exists public.wedding_admin_sessions (
  hash text primary key,
  expires bigint not null
);
create table if not exists public.wedding_login_failures (
  id bigint generated always as identity primary key,
  created_at bigint not null
);
create index if not exists wedding_sessions_expiry on public.wedding_admin_sessions(expires);
create index if not exists wedding_failures_time on public.wedding_login_failures(created_at);
create index if not exists wedding_invitations_created on public.wedding_invitations(created_at desc);

alter table public.wedding_invitations enable row level security;
alter table public.wedding_admin_sessions enable row level security;
alter table public.wedding_login_failures enable row level security;
-- Guests use our Next.js API, which checks their invitation token. The public
-- and signed-in Supabase clients must never read or modify these tables.
revoke all on public.wedding_invitations, public.wedding_admin_sessions, public.wedding_login_failures from public, anon, authenticated;
grant select, insert, update, delete on public.wedding_invitations, public.wedding_admin_sessions, public.wedding_login_failures to service_role;
grant usage, select on sequence public.wedding_login_failures_id_seq to service_role;
commit;
