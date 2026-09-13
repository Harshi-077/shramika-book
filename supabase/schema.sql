-- Shramika Book — reference schema
-- ---------------------------------------------------------------
-- This file documents the database structure the app expects.
-- Your Supabase project already has these tables and RLS policies
-- configured, so you should NOT need to run this.
--
-- It is provided only as a reference / safety net in case a table
-- is missing. Every statement below uses "IF NOT EXISTS" so it is
-- safe to run without affecting existing data.
-- ---------------------------------------------------------------

create extension if not exists "uuid-ossp";

-- 1. Labours ------------------------------------------------------
create table if not exists "Labours" (
  id uuid primary key default uuid_generate_v4(),
  manager_id uuid not null references auth.users(id),
  name text not null,
  phone_number text not null,
  gender text not null check (gender in ('Male', 'Female')),
  daily_wage numeric not null,
  created_at timestamptz not null default now()
);

alter table "Labours" enable row level security;

create policy if not exists "Labours: manager can access own rows"
  on "Labours" for all
  using (manager_id = auth.uid())
  with check (manager_id = auth.uid());

-- 2. Attendance -----------------------------------------------------
create table if not exists "Attendance" (
  id uuid primary key default uuid_generate_v4(),
  manager_id uuid not null references auth.users(id),
  attendance_date date not null,
  created_at timestamptz not null default now()
);

alter table "Attendance" enable row level security;

create policy if not exists "Attendance: manager can access own rows"
  on "Attendance" for all
  using (manager_id = auth.uid())
  with check (manager_id = auth.uid());

-- 3. attendance_labourers -------------------------------------------
create table if not exists attendance_labourers (
  id uuid primary key default uuid_generate_v4(),
  attendance_id uuid not null references "Attendance"(id) on delete cascade,
  labourer_id uuid not null references "Labours"(id) on delete cascade
);

alter table attendance_labourers enable row level security;

create policy if not exists "attendance_labourers: manager can access own rows"
  on attendance_labourers for all
  using (
    exists (
      select 1 from "Attendance" a
      where a.id = attendance_labourers.attendance_id
      and a.manager_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from "Attendance" a
      where a.id = attendance_labourers.attendance_id
      and a.manager_id = auth.uid()
    )
  );

-- 4. payments ---------------------------------------------------------
create table if not exists payments (
  id uuid primary key default uuid_generate_v4(),
  manager_id uuid not null references auth.users(id),
  labourer_id uuid not null references "Labours"(id) on delete cascade,
  amount numeric not null,
  payment_date date not null,
  created_at timestamptz not null default now()
);

alter table payments enable row level security;

create policy if not exists "payments: manager can access own rows"
  on payments for all
  using (manager_id = auth.uid())
  with check (manager_id = auth.uid());

-- Explicit DELETE policy, in case an existing project only has separate
-- SELECT/INSERT/UPDATE policies and is missing DELETE coverage. Creating
-- this alongside the "for all" policy above is harmless — Postgres allows
-- multiple permissive policies on the same table/action.
create policy if not exists "payments: manager can delete own rows"
  on payments for delete
  using (manager_id = auth.uid());

-- 5. field_owners ------------------------------------------------------
create table if not exists field_owners (
  id uuid primary key default uuid_generate_v4(),
  manager_id uuid not null references auth.users(id),
  name text not null,
  phone_number text not null,
  created_at timestamptz not null default now()
);

alter table field_owners enable row level security;

create policy if not exists "field_owners: manager can access own rows"
  on field_owners for all
  using (manager_id = auth.uid())
  with check (manager_id = auth.uid());

-- 6. field_owner_work ----------------------------------------------------
create table if not exists field_owner_work (
  id uuid primary key default uuid_generate_v4(),
  manager_id uuid not null references auth.users(id),
  field_owner_id uuid not null references field_owners(id) on delete cascade,
  work_date date not null,
  workers_sent integer not null,
  created_at timestamptz not null default now()
);

alter table field_owner_work enable row level security;

create policy if not exists "field_owner_work: manager can access own rows"
  on field_owner_work for all
  using (manager_id = auth.uid())
  with check (manager_id = auth.uid());

-- 7. settings -----------------------------------------------------------
create table if not exists settings (
  id uuid primary key default uuid_generate_v4(),
  manager_id uuid not null references auth.users(id) unique,
  language text not null default 'en' check (language in ('en', 'te')),
  created_at timestamptz not null default now()
);

alter table settings enable row level security;

create policy if not exists "settings: manager can access own rows"
  on settings for all
  using (manager_id = auth.uid())
  with check (manager_id = auth.uid());
