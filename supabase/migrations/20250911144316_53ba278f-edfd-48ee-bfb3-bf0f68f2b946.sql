-- Create events table for storing event information and photos
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  event_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on events table
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policies for events table
CREATE POLICY "Allow public read access to events" 
ON public.events 
FOR SELECT 
USING (true);

CREATE POLICY "Only coordenacao can insert events" 
ON public.events 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Only coordenacao can update events" 
ON public.events 
FOR UPDATE 
USING (true);

CREATE POLICY "Only coordenacao can delete events" 
ON public.events 
FOR DELETE 
USING (true);

-- Create event_photos table to store individual photo references
CREATE TABLE public.event_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  photo_order INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on event_photos table
ALTER TABLE public.event_photos ENABLE ROW LEVEL SECURITY;

-- Create policies for event_photos table
CREATE POLICY "Allow public read access to event_photos" 
ON public.event_photos 
FOR SELECT 
USING (true);

CREATE POLICY "Only coordenacao can insert event_photos" 
ON public.event_photos 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Only coordenacao can update event_photos" 
ON public.event_photos 
FOR UPDATE 
USING (true);

CREATE POLICY "Only coordenacao can delete event_photos" 
ON public.event_photos 
FOR DELETE 
USING (true);

-- Create storage bucket for event photos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('event-photos', 'event-photos', true);

-- Create storage policies for event photos
CREATE POLICY "Allow public read access to event photos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'event-photos');

CREATE POLICY "Only coordenacao can upload event photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'event-photos');

CREATE POLICY "Only coordenacao can update event photos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'event-photos');

CREATE POLICY "Only coordenacao can delete event photos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'event-photos');

-- Create trigger for updating timestamps
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();