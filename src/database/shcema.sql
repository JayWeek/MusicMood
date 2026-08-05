Database Schema
MusicMood Database schema:
 
-- 1. DROP EXISTING TABLES (Ensures clean state resets during development)

drop table if exists public.playlist_songs cascade;

drop table if exists public.playlists cascade;
 
-- 2. CREATE PLAYLISTS PARENT TABLE

create table public.playlists (

    id uuid default gen_random_uuid() primary key,

    user_id uuid not null references auth.users(id) on delete cascade,

    title text not null,

    prompt text not null,

    --change prompt column to mood or add a mood column to store the mood of the playlist

    -- add description column to store the playlist description

    created_at timestamp with time zone default timezone('utc'::text, now()) not null

);
 
-- 3. CREATE PLAYLIST_SONGS CHILD TABLE

create table public.playlist_songs (

    id uuid default gen_random_uuid() primary key,

    playlist_id uuid not null references public.playlists(id) on delete cascade,

    title text not null,

    artist text not null,

    youtube_id text, -- Payload metadata for media playback resolution

    position integer not null, -- Guarantees exact track ordering stays intact

    created_at timestamp with time zone default timezone('utc'::text, now()) not null

);
 
-- 4. PERFORMANCE TUNING INDEXES (Ensures rapid lookups when pulling history lists)

create index playlists_user_id_idx on public.playlists(user_id);

create index playlist_songs_playlist_id_idx on public.playlist_songs(playlist_id);
 
-- 5. ENABLE ROW-LEVEL SECURITY (RLS)

alter table public.playlists enable row level security;

alter table public.playlist_songs enable row level security;
 
-- 6. DEFINE ACCESS POLICIES (Ensures users only access records linked to their auth ID)

create policy "Users can manage their own playlists" 

    on public.playlists 

    for all 

    using (auth.uid() = user_id);
 
create policy "Users can manage songs within their own playlists" 

    on public.playlist_songs 

    for all 

    using (

        playlist_id in (

            select id from public.playlists where user_id = auth.uid()

        )

    );
 
 
-- FAVORITE SONGS TABLE
 
create table public.favorite_songs (

    id uuid default gen_random_uuid() primary key,
 
    user_id uuid not null

        references auth.users(id)

        on delete cascade,
 
    title text not null,
 
    artist text not null,
 
    youtube_id text not null,
 
    created_at timestamp with time zone

        default timezone('utc'::text, now())

        not null,
 
    constraint favorite_unique_song

        unique (user_id, youtube_id)

);
 
-- INDEX

create index favorite_songs_user_id_idx

on public.favorite_songs(user_id);
 
-- ENABLE RLS

alter table public.favorite_songs

enable row level security;
 
-- POLICY

create policy "Users can manage their own favorite songs"

on public.favorite_songs

for all

using (auth.uid() = user_id);

 