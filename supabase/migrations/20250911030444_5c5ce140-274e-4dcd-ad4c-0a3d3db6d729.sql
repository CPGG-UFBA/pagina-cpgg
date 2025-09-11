-- Add description column to user_profiles table
ALTER TABLE public.user_profiles 
ADD COLUMN description TEXT;