-- Supabase Database Schema

-- 1. GUESTBOOK TABLE
CREATE TABLE IF NOT EXISTS public.guestbook (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    user_id UUID,
    name TEXT NOT NULL,
    avatar_url TEXT,
    message TEXT NOT NULL,
    is_pinned BOOLEAN DEFAULT false,
    liked_by TEXT
);

alter table public.guestbook enable row level security;

create policy " Anyone can read guestbook\ on public.guestbook for select using (true);
create policy \Authenticated users can insert entries\ on public.guestbook for insert with check (auth.role() = 'authenticated');

-- 2. MESSAGES TABLE (Contact Form)
CREATE TABLE IF NOT EXISTS public.messages (
 id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 created_at TIMESTAMPTZ DEFAULT now(),
 name TEXT,
 email TEXT NOT NULL,
 message TEXT NOT NULL
);

alter table public.messages enable row level security;

create policy \Anyone can insert messages\ on public.messages for insert with check (true);

-- 3. BLOG COMMENTS TABLE
CREATE TABLE IF NOT EXISTS public.blog_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    blog_slug TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    avatar_url TEXT,
    message TEXT NOT NULL
);

alter table public.blog_comments enable row level security;

create policy "Anyone can read blog comments" on public.blog_comments for select using (true);
create policy "Authenticated users can insert blog comments" on public.blog_comments for insert with check (auth.role() = 'authenticated');
create policy "Users can delete own blog comments" on public.blog_comments for delete using (auth.uid() = user_id);

-- 4. BLOG STATS TABLE (views, likes, claps per post)
CREATE TABLE IF NOT EXISTS public.blog_stats (
    blog_slug TEXT PRIMARY KEY,
    views BIGINT DEFAULT 0,
    likes BIGINT DEFAULT 0,
    claps BIGINT DEFAULT 0
);

alter table public.blog_stats enable row level security;

create policy "Anyone can read blog stats" on public.blog_stats for select using (true);
create policy "Anyone can upsert blog stats" on public.blog_stats for all using (true) with check (true);

-- Function to increment a stat atomically
CREATE OR REPLACE FUNCTION increment_blog_stat(p_slug TEXT, p_field TEXT)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    INSERT INTO public.blog_stats (blog_slug) VALUES (p_slug) ON CONFLICT (blog_slug) DO NOTHING;
    IF p_field = 'views' THEN
        UPDATE public.blog_stats SET views = views + 1 WHERE blog_slug = p_slug;
    ELSIF p_field = 'likes' THEN
        UPDATE public.blog_stats SET likes = likes + 1 WHERE blog_slug = p_slug;
    ELSIF p_field = 'claps' THEN
        UPDATE public.blog_stats SET claps = claps + 1 WHERE blog_slug = p_slug;
    END IF;
END;
$$;
