-- StudyMate BTEC V9 — public learning site + protected admin content management.
-- Public students do NOT create accounts. Authentication is only used for the admin panel.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'student' check (role in ('student','admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value text,
  updated_at timestamptz not null default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 160),
  description text,
  icon text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.lectures (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete set null,
  course text,
  title text not null check (char_length(title) between 1 and 160),
  unit text,
  description text,
  youtube_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.labs (
  id uuid primary key default gen_random_uuid(),
  lecture_id uuid references public.lectures(id) on delete set null,
  title text not null check (char_length(title) between 1 and 160),
  description text,
  instructions text,
  lab_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 180),
  description text,
  url text not null,
  kind text not null default 'رابط',
  grade text not null default 'الكل',
  specialization text not null default 'الكل',
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 180),
  description text,
  url text not null,
  kind text not null default 'رابط',
  grade text not null default 'الكل',
  specialization text not null default 'الكل',
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.quizzes (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 160),
  category text,
  payload jsonb not null default '{"questions":[]}'::jsonb,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.courses enable row level security;
alter table public.lectures enable row level security;
alter table public.labs enable row level security;
alter table public.resources enable row level security;
alter table public.tasks enable row level security;
alter table public.quizzes enable row level security;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path=public as $$
  select exists(select 1 from public.profiles where id=auth.uid() and role='admin');
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- Auto-create an auth profile. Promote the owner once with:
-- update public.profiles set role='admin' where id='<AUTH_USER_UUID>';
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path=public as $$
begin
  insert into public.profiles(id,full_name,role)
  values(new.id,coalesce(new.raw_user_meta_data->>'full_name',''),'student')
  on conflict(id) do nothing;
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

-- Profile: users may read themselves; admins may read all. Role changes are admin-only.
drop policy if exists "profiles read own" on public.profiles;
drop policy if exists "profiles admin update" on public.profiles;
create policy "profiles read own" on public.profiles for select using (auth.uid()=id or public.is_admin());
create policy "profiles admin update" on public.profiles for update using (public.is_admin()) with check (public.is_admin());

-- Site settings are readable publicly; only admin can change them.
drop policy if exists "site settings public read" on public.site_settings;
drop policy if exists "site settings admin insert" on public.site_settings;
drop policy if exists "site settings admin update" on public.site_settings;
create policy "site settings public read" on public.site_settings for select using (true);
create policy "site settings admin insert" on public.site_settings for insert with check (public.is_admin());
create policy "site settings admin update" on public.site_settings for update using (public.is_admin()) with check (public.is_admin());

-- Public educational content: published rows are public; admin has full CRUD.
do $$
declare t text;
begin
  foreach t in array array['courses','lectures','labs','resources','tasks','quizzes'] loop
    execute format('drop policy if exists %I on public.%I', t||' public read', t);
    execute format('drop policy if exists %I on public.%I', t||' admin insert', t);
    execute format('drop policy if exists %I on public.%I', t||' admin update', t);
    execute format('drop policy if exists %I on public.%I', t||' admin delete', t);
    execute format('create policy %I on public.%I for select using (is_published or public.is_admin())', t||' public read', t);
    execute format('create policy %I on public.%I for insert with check (public.is_admin())', t||' admin insert', t);
    execute format('create policy %I on public.%I for update using (public.is_admin()) with check (public.is_admin())', t||' admin update', t);
    execute format('create policy %I on public.%I for delete using (public.is_admin())', t||' admin delete', t);
  end loop;
end $$;

-- V9: public tasks and site settings (student accounts/submissions are no longer required by the public experience)
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 180),
  description text,
  task_url text,
  explanation text,
  explanation_url text,
  grade text not null default 'الكل',
  specialization text not null default 'الكل',
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);
create table if not exists public.site_settings (
  id text primary key default 'main',
  whatsapp_number text,
  created_at timestamptz not null default now()
);
alter table public.tasks enable row level security;
alter table public.site_settings enable row level security;
drop policy if exists "tasks public read" on public.tasks;
drop policy if exists "tasks admin insert" on public.tasks;
drop policy if exists "tasks admin update" on public.tasks;
drop policy if exists "tasks admin delete" on public.tasks;
create policy "tasks public read" on public.tasks for select using (is_published or public.is_admin());
create policy "tasks admin insert" on public.tasks for insert with check (public.is_admin());
create policy "tasks admin update" on public.tasks for update using (public.is_admin()) with check (public.is_admin());
create policy "tasks admin delete" on public.tasks for delete using (public.is_admin());
drop policy if exists "settings public read" on public.site_settings;
drop policy if exists "settings admin insert" on public.site_settings;
drop policy if exists "settings admin update" on public.site_settings;
create policy "settings public read" on public.site_settings for select using (true);
create policy "settings admin insert" on public.site_settings for insert with check (public.is_admin());
create policy "settings admin update" on public.site_settings for update using (public.is_admin()) with check (public.is_admin());
