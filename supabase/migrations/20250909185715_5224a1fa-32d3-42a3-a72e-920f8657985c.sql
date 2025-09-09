-- Create table for laboratories
CREATE TABLE public.laboratories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  acronym TEXT NOT NULL,
  chief_name TEXT NOT NULL,
  description TEXT,
  pnipe_address TEXT,
  photo1_url TEXT,
  photo2_url TEXT,
  photo3_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.laboratories ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to laboratories" 
ON public.laboratories 
FOR SELECT 
USING (true);

-- Create policies for coordenacao to manage laboratories
CREATE POLICY "Only coordenacao can insert laboratories" 
ON public.laboratories 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Only coordenacao can update laboratories" 
ON public.laboratories 
FOR UPDATE 
USING (true);

CREATE POLICY "Only coordenacao can delete laboratories" 
ON public.laboratories 
FOR DELETE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_laboratories_updated_at
BEFORE UPDATE ON public.laboratories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for laboratory photos
INSERT INTO storage.buckets (id, name, public) VALUES ('laboratory-photos', 'laboratory-photos', true);

-- Create storage policies for laboratory photos
CREATE POLICY "Laboratory photos are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'laboratory-photos');

CREATE POLICY "Coordenacao can upload laboratory photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'laboratory-photos');

CREATE POLICY "Coordenacao can update laboratory photos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'laboratory-photos');

CREATE POLICY "Coordenacao can delete laboratory photos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'laboratory-photos');