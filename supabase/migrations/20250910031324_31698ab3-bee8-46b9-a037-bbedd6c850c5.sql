-- Enforce uniqueness for email and full_name (case-insensitive)
-- Create unique indexes using lower() to avoid case-sensitive duplicates
CREATE UNIQUE INDEX IF NOT EXISTS user_profiles_email_unique_ci
ON public.user_profiles (lower(email));

CREATE UNIQUE INDEX IF NOT EXISTS user_profiles_full_name_unique_ci
ON public.user_profiles (lower(full_name));