create extension if not exists pgcrypto;

create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text not null,
  password_hash text not null,
  last_login timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  description text not null,
  impact text not null,
  tags text[] not null default '{}',
  published boolean not null default false,
  order_index integer not null default 0,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists insights (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  date text not null,
  category text not null,
  read_time text not null,
  author text not null,
  content jsonb not null,
  published boolean not null default false,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  organization text,
  message text not null,
  status text not null default 'new'
    check (status in ('new', 'read', 'responded', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists feedback_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  feedback_type text not null
    check (feedback_type in ('general', 'technical', 'collaboration')),
  message text not null,
  rating integer check (rating is null or rating between 1 and 5),
  status text not null default 'new'
    check (status in ('new', 'read', 'responded', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_published_order_idx
  on projects (published, order_index);

create index if not exists insights_published_created_idx
  on insights (published, created_at desc);

create index if not exists contact_status_created_idx
  on contact_submissions (status, created_at desc);

create index if not exists feedback_status_created_idx
  on feedback_submissions (status, created_at desc);
