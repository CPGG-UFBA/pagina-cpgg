-- Add institution column to researchers table
ALTER TABLE public.researchers
ADD COLUMN institution text DEFAULT 'UFBA' NOT NULL;