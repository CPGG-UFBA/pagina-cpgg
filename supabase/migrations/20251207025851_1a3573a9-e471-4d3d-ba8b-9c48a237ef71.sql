-- Create calendars table
CREATE TABLE public.calendars (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  year integer NOT NULL,
  pdf_url text NOT NULL,
  display_order integer NOT NULL DEFAULT 1,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.calendars ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to calendars" 
ON public.calendars 
FOR SELECT 
USING (true);

-- Create policies for coordenacao and secretaria to manage calendars
CREATE POLICY "Only coordenacao and secretaria can insert calendars" 
ON public.calendars 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM admin_users 
  WHERE admin_users.user_id = auth.uid() 
  AND admin_users.role IN ('coordenacao', 'secretaria')
));

CREATE POLICY "Only coordenacao and secretaria can update calendars" 
ON public.calendars 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM admin_users 
  WHERE admin_users.user_id = auth.uid() 
  AND admin_users.role IN ('coordenacao', 'secretaria')
));

CREATE POLICY "Only coordenacao and secretaria can delete calendars" 
ON public.calendars 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM admin_users 
  WHERE admin_users.user_id = auth.uid() 
  AND admin_users.role IN ('coordenacao', 'secretaria')
));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_calendars_updated_at
BEFORE UPDATE ON public.calendars
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert existing calendars
INSERT INTO public.calendars (name, year, pdf_url, display_order) VALUES
  ('Calendário de 2025', 2025, 'https://raw.githubusercontent.com/CPGG-UFBA/Documentos_WEB_CPGG/main/cal2025.pdf', 1),
  ('Calendário de 2024', 2024, 'https://raw.githubusercontent.com/CPGG-UFBA/Documentos_WEB_CPGG/main/cal2024.pdf', 2),
  ('Calendário de 2023', 2023, 'https://raw.githubusercontent.com/CPGG-UFBA/Documentos_WEB_CPGG/main/cal2023.pdf', 3),
  ('Calendário de 2022', 2022, 'https://raw.githubusercontent.com/CPGG-UFBA/Documentos_WEB_CPGG/main/cal2022.pdf', 4),
  ('Calendário de 2021', 2021, 'https://raw.githubusercontent.com/CPGG-UFBA/Documentos_WEB_CPGG/main/cal2021.pdf', 5),
  ('Calendário de 2020', 2020, 'https://raw.githubusercontent.com/CPGG-UFBA/Documentos_WEB_CPGG/main/cal2020.pdf', 6);

-- Create storage bucket for calendar PDFs
INSERT INTO storage.buckets (id, name, public) 
VALUES ('calendars', 'calendars', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for calendar PDFs
CREATE POLICY "Calendar PDFs are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'calendars');

CREATE POLICY "Coordenacao and secretaria can upload calendar PDFs" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'calendars' 
  AND EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.user_id = auth.uid() 
    AND admin_users.role IN ('coordenacao', 'secretaria')
  )
);

CREATE POLICY "Coordenacao and secretaria can delete calendar PDFs" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'calendars' 
  AND EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.user_id = auth.uid() 
    AND admin_users.role IN ('coordenacao', 'secretaria')
  )
);