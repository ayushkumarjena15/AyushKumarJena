ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS reschedule_date TEXT,
  ADD COLUMN IF NOT EXISTS reschedule_time_ist TEXT,
  ADD COLUMN IF NOT EXISTS owner_notes TEXT,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- status column values: pending | accepted | rejected | rescheduled
