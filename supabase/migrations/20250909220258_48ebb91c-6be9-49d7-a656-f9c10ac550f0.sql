-- Create a table for regulations
CREATE TABLE public.regulations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  pdf_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.regulations ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to regulations" 
ON public.regulations 
FOR SELECT 
USING (true);

-- Create policies for coordenacao admin access
CREATE POLICY "Only coordenacao can insert regulations" 
ON public.regulations 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Only coordenacao can update regulations" 
ON public.regulations 
FOR UPDATE 
USING (true);

CREATE POLICY "Only coordenacao can delete regulations" 
ON public.regulations 
FOR DELETE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_regulations_updated_at
BEFORE UPDATE ON public.regulations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();