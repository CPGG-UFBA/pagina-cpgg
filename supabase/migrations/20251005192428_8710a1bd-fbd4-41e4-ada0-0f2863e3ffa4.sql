-- Allow public read access to researchers table
DROP POLICY IF EXISTS "Authenticated users can view researchers" ON public.researchers;

CREATE POLICY "Allow public read access to researchers"
ON public.researchers
FOR SELECT
USING (true);