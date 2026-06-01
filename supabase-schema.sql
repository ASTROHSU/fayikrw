create table if not exists public.fayikrw_entries (
  id text primary key,
  kind text not null check (kind in ('book', 'split')),
  note text not null,
  amount numeric not null,
  currency text not null check (currency in ('TWD', 'KRW')),
  payer text check (payer in ('star', 'moon')),
  created_at timestamptz not null default now()
);

create table if not exists public.fayikrw_settings (
  key text primary key,
  value text,
  updated_at timestamptz not null default now()
);

alter table public.fayikrw_entries enable row level security;
alter table public.fayikrw_settings enable row level security;

drop policy if exists "public read entries" on public.fayikrw_entries;
drop policy if exists "public insert entries" on public.fayikrw_entries;
drop policy if exists "public update entries" on public.fayikrw_entries;
drop policy if exists "public delete entries" on public.fayikrw_entries;
drop policy if exists "public read settings" on public.fayikrw_settings;
drop policy if exists "public upsert settings" on public.fayikrw_settings;
drop policy if exists "public update settings" on public.fayikrw_settings;

create policy "public read entries"
on public.fayikrw_entries for select
using (true);

create policy "public insert entries"
on public.fayikrw_entries for insert
with check (true);

create policy "public update entries"
on public.fayikrw_entries for update
using (true)
with check (true);

create policy "public delete entries"
on public.fayikrw_entries for delete
using (true);

create policy "public read settings"
on public.fayikrw_settings for select
using (true);

create policy "public upsert settings"
on public.fayikrw_settings for insert
with check (true);

create policy "public update settings"
on public.fayikrw_settings for update
using (true)
with check (true);
