-- Block all SELECT access to waitlist_signups table
CREATE POLICY "No public read access" 
ON public.waitlist_signups 
FOR SELECT 
USING (false);