-- Enquiry storage for the free website draft workflow.
-- Apply this to a new Supabase project for this site. Do not run it against unrelated projects.
-- Access is through the service role in server actions. Anonymous and signed-in API roles have no grants.

create type public.enquiry_status as enum (
  'new',
  'contacted',
  'draft_in_progress',
  'draft_ready',
  'sent',
  'converted',
  'not_proceeding'
);

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  business_name text not null,
  email text not null,
  phone text not null,
  trade text not null,
  location text not null,
  existing_website text,
  description text not null,
  services text not null,
  preferred_colours text,
  additional_information text,
  status public.enquiry_status not null default 'new',
  internal_notes text not null default '',
  preview_slug text unique,
  purchased boolean not null default false,
  follow_up_sent_at timestamptz,
  draft_sent_at timestamptz,
  template text not null default 'standard',
  preview_content jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.enquiry_assets (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid not null references public.enquiries (id) on delete cascade,
  storage_path text not null,
  kind text not null check (kind in ('logo', 'photo')),
  created_at timestamptz not null default now()
);

create index enquiries_email_created_at_idx on public.enquiries (email, created_at desc);
create index enquiries_status_idx on public.enquiries (status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger enquiries_set_updated_at
before update on public.enquiries
for each row
execute function public.set_updated_at();

alter table public.enquiries enable row level security;
alter table public.enquiry_assets enable row level security;

revoke all on table public.enquiries from anon, authenticated;
revoke all on table public.enquiry_assets from anon, authenticated;
revoke all on function public.set_updated_at() from public, anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'enquiry-assets',
  'enquiry-assets',
  false,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;
