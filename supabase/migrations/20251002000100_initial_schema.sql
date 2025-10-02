-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- Helper function to keep updated_at in sync
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Categories
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text generated always as (
    lower(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g'))
  ) stored,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_categories_updated_at
before update on public.categories
for each row execute function public.handle_updated_at();

-- Products
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text generated always as (
    lower(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g'))
  ) stored,
  description text,
  price numeric(10,2) not null check (price >= 0),
  image text,
  category_id uuid references public.categories(id) on delete set null,
  category_name text,
  collection_slug text,
  featured boolean not null default false,
  is_published boolean not null default true,
  stock integer not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists products_slug_idx on public.products(slug);
create index if not exists products_collection_idx on public.products(collection_slug);
create index if not exists products_category_idx on public.products(category_id);

create trigger trg_products_updated_at
before update on public.products
for each row execute function public.handle_updated_at();

-- Orders
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text,
  email text,
  phone text,
  total numeric(10,2) not null default 0 check (total >= 0),
  status text not null default 'pending',
  items jsonb not null default '[]'::jsonb,
  placed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_status_idx on public.orders(status);
create index if not exists orders_placed_at_idx on public.orders(placed_at desc);

create trigger trg_orders_updated_at
before update on public.orders
for each row execute function public.handle_updated_at();

-- Profiles linked to Supabase Auth users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  display_name text,
  role text not null default 'user',
  last_login timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_role_idx on public.profiles(role);

create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.handle_updated_at();

-- Helper function to detect admin/staff roles (requires profiles table)
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(
    exists (
      select 1
      from public.profiles
      where id = auth.uid()
        and role in ('admin', 'staff')
    ), false
  );
$$;

-- Administrative settings (setup key etc.)
create table if not exists public.admin_settings (
  id text primary key default 'setup',
  setup_key text not null default encode(extensions.gen_random_bytes(16), 'hex'),
  admin_emails text[] not null default array[]::text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.admin_settings (id)
values ('setup')
on conflict (id) do nothing;

create trigger trg_admin_settings_updated_at
before update on public.admin_settings
for each row execute function public.handle_updated_at();

-- Row Level Security policies
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.profiles enable row level security;
alter table public.admin_settings enable row level security;

-- Categories: everyone can read, only admins modify
create policy "Public categories read"
  on public.categories
  for select
  using (true);

create policy "Admins manage categories"
  on public.categories
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- Products policies
create policy "Public products read"
  on public.products
  for select
  using (is_published);

create policy "Authenticated read all products"
  on public.products
  for select
  to authenticated
  using (true);

create policy "Admins manage products"
  on public.products
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- Orders policies (admins only)
create policy "Admins manage orders"
  on public.orders
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- Profiles policies
create policy "Users access own profile"
  on public.profiles
  for select
  using (id = auth.uid());

create policy "Admins view profiles"
  on public.profiles
  for select
  to authenticated
  using (public.is_admin());

create policy "Users manage own profile"
  on public.profiles
  for insert
  with check (id = auth.uid());

create policy "Users update own profile"
  on public.profiles
  for update
  using (id = auth.uid())
  with check (id = auth.uid());

-- Admin settings policies (admins only)
create policy "Admins manage settings"
  on public.admin_settings
  for all
  using (public.is_admin())
  with check (public.is_admin());

comment on table public.admin_settings is 'Stores setup key and admin metadata for the admin console. Update setup_key after deployment.';
comment on table public.profiles is 'Application-level profile data associated with Supabase Auth users.';
comment on table public.products is 'Storefront product catalog served to the public.';
