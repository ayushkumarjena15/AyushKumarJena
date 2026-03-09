-- Bookings table for call scheduling
CREATE TABLE IF NOT EXISTS public.bookings (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at  TIMESTAMPTZ DEFAULT now(),
    name        TEXT NOT NULL,
    email       TEXT NOT NULL,
    topic       TEXT NOT NULL,
    notes       TEXT,
    guests      TEXT[],
    date        TEXT NOT NULL,
    time_ist    TEXT NOT NULL,
    time_local  TEXT NOT NULL,
    timezone    TEXT NOT NULL,
    status      TEXT NOT NULL DEFAULT 'pending'  -- pending | confirmed | rejected
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Anyone can insert a booking (no auth required)
CREATE POLICY "Anyone can insert bookings"
    ON public.bookings FOR INSERT
    WITH CHECK (true);

-- Only the service role (Ayush) can read/update bookings
CREATE POLICY "Service role can manage bookings"
    ON public.bookings FOR ALL
    USING (auth.role() = 'service_role');
