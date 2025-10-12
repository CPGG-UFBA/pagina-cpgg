-- Create scientific_publications table
CREATE TABLE public.scientific_publications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  authors TEXT NOT NULL,
  year TEXT NOT NULL,
  journal_name TEXT NOT NULL,
  article_title TEXT NOT NULL,
  pages TEXT NOT NULL,
  volume TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.scientific_publications ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to scientific_publications" 
ON public.scientific_publications 
FOR SELECT 
USING (true);

-- Create policies for coordenacao/secretaria to insert
CREATE POLICY "Only coordenacao can insert scientific_publications" 
ON public.scientific_publications 
FOR INSERT 
WITH CHECK (true);

-- Create policies for coordenacao/secretaria to update
CREATE POLICY "Only coordenacao can update scientific_publications" 
ON public.scientific_publications 
FOR UPDATE 
USING (true);

-- Create policies for coordenacao/secretaria to delete
CREATE POLICY "Only coordenacao can delete scientific_publications" 
ON public.scientific_publications 
FOR DELETE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_scientific_publications_updated_at
BEFORE UPDATE ON public.scientific_publications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();