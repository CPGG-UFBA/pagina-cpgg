-- Add equipamento column to reservations table
ALTER TABLE public.reservations 
ADD COLUMN equipamento text;