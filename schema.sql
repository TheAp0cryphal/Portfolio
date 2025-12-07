-- Run this in your Supabase SQL Editor

create table public.ascii_art (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  ascii_text text not null,
  constraint ascii_art_pkey primary key (id)
) tablespace pg_default;

-- Setup Row Level Security (RLS)
alter table public.ascii_art enable row level security;

-- Allow public read access
create policy "Enable read access for all users"
on public.ascii_art
for select
to public
using (true);

-- Allow public insert access (for anyone to upload)
create policy "Enable insert access for all users"
on public.ascii_art
for insert
to public
with check (true);
