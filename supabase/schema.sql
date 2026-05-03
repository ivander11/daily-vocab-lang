create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  source_language text not null default 'zh',
  target_language text not null default 'en',
  chinese_display_mode text not null default 'both'
    check (chinese_display_mode in ('simplified', 'traditional', 'both')),
  estimated_level text not null default 'beginner'
    check (estimated_level in ('beginner', 'intermediate', 'advanced')),
  placement_completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vocabulary (
  id text primary key,
  source_language text not null default 'zh',
  target_language text not null default 'en',
  term text not null,
  simplified text not null,
  traditional text not null,
  pinyin text not null,
  example_en text not null,
  example_zh_simplified text not null,
  example_zh_traditional text not null,
  difficulty text not null check (difficulty in ('beginner', 'intermediate', 'advanced')),
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.user_word_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  vocabulary_id text not null references public.vocabulary(id) on delete cascade,
  status text not null check (status in ('new', 'learning', 'known')),
  times_seen integer not null default 0,
  times_marked_known integer not null default 0,
  times_marked_learning integer not null default 0,
  times_marked_new integer not null default 0,
  last_seen_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, vocabulary_id)
);

create table if not exists public.placement_attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  score integer not null,
  estimated_level text not null check (estimated_level in ('beginner', 'intermediate', 'advanced')),
  completed_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.vocabulary enable row level security;
alter table public.user_word_progress enable row level security;
alter table public.placement_attempts enable row level security;

create policy "profiles are readable by owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles are writable by owner"
  on public.profiles for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "vocabulary is readable by authenticated users"
  on public.vocabulary for select
  to authenticated
  using (true);

create policy "progress is readable by owner"
  on public.user_word_progress for select
  using (auth.uid() = user_id);

create policy "progress is writable by owner"
  on public.user_word_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "placement attempts are readable by owner"
  on public.placement_attempts for select
  using (auth.uid() = user_id);

create policy "placement attempts are writable by owner"
  on public.placement_attempts for insert
  with check (auth.uid() = user_id);
