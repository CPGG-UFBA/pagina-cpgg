-- Tornar o campo email opcional na tabela researchers
ALTER TABLE public.researchers 
ALTER COLUMN email DROP NOT NULL;