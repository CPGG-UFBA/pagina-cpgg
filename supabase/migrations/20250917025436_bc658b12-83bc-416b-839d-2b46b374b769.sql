-- Create table for visitor location tracking
CREATE TABLE public.visitor_locations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  visitor_count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.visitor_locations ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access and system write access
CREATE POLICY "Allow public read access to visitor_locations" 
ON public.visitor_locations 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert access to visitor_locations" 
ON public.visitor_locations 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update access to visitor_locations" 
ON public.visitor_locations 
FOR UPDATE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_visitor_locations_updated_at
BEFORE UPDATE ON public.visitor_locations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance on city/country lookups
CREATE INDEX idx_visitor_locations_city_country ON public.visitor_locations(city, country);