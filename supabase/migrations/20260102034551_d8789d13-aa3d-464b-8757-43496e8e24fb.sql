-- Create waitlist signups table
CREATE TABLE public.waitlist_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  referral_url TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create unique index on email to prevent duplicates
CREATE UNIQUE INDEX idx_waitlist_email ON public.waitlist_signups (email);

-- Enable Row Level Security
ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (no auth required for waitlist signup)
CREATE POLICY "Anyone can submit to waitlist"
ON public.waitlist_signups
FOR INSERT
WITH CHECK (true);

-- Only admins can view signups (no public read access)
-- Data can be exported via the Cloud dashboard