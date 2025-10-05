-- SECURITY FIX: Protect researcher email addresses from public harvesting

-- 1. Remove the policy that allows unrestricted public access to researchers table
DROP POLICY IF EXISTS "Allow public read access to researchers" ON public.researchers;

-- 2. Create new policy: Only authenticated users can view researchers
-- This protects email addresses while allowing legitimate users to access researcher information
CREATE POLICY "Authenticated users can view researchers"
ON public.researchers
FOR SELECT
TO authenticated
USING (true);

-- SECURITY NOTE: Email addresses are now protected from spam bots and scrapers.
-- Only authenticated users can access researcher information including emails.