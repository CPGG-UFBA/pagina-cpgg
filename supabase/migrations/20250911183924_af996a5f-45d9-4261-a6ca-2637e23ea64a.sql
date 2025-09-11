-- Create laiga_equipments table for managing LAIGA equipment reservations
CREATE TABLE public.laiga_equipments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  model TEXT,
  brand TEXT,
  serial_number TEXT,
  status TEXT NOT NULL DEFAULT 'available',
  location TEXT,
  responsible_person TEXT,
  acquisition_date DATE,
  last_maintenance DATE,
  next_maintenance DATE,
  observations TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.laiga_equipments ENABLE ROW LEVEL SECURITY;

-- Create policies for LAIGA equipments
CREATE POLICY "Allow public read access to laiga_equipments" 
ON public.laiga_equipments 
FOR SELECT 
USING (true);

CREATE POLICY "Only coordenacao can insert laiga_equipments" 
ON public.laiga_equipments 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Only coordenacao can update laiga_equipments" 
ON public.laiga_equipments 
FOR UPDATE 
USING (true);

CREATE POLICY "Only coordenacao can delete laiga_equipments" 
ON public.laiga_equipments 
FOR DELETE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_laiga_equipments_updated_at
BEFORE UPDATE ON public.laiga_equipments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();