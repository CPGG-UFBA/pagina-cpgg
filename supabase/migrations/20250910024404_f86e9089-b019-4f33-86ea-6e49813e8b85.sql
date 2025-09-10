-- Add photo_url column to user_profiles table
ALTER TABLE public.user_profiles 
ADD COLUMN photo_url text;