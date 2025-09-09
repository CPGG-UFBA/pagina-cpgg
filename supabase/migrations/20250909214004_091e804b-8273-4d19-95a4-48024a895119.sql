-- Create news table for storing articles
CREATE TABLE public.news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  photo1_url TEXT,
  photo2_url TEXT,
  photo3_url TEXT,
  cover_photo_number INTEGER DEFAULT 1 CHECK (cover_photo_number IN (1, 2, 3)),
  news_position TEXT NOT NULL CHECK (news_position IN ('News1', 'News2', 'News3')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to news" 
ON public.news 
FOR SELECT 
USING (true);

-- Create policies for coordenacao admin access
CREATE POLICY "Only coordenacao can insert news" 
ON public.news 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Only coordenacao can update news" 
ON public.news 
FOR UPDATE 
USING (true);

CREATE POLICY "Only coordenacao can delete news" 
ON public.news 
FOR DELETE 
USING (true);

-- Create storage bucket for news photos
INSERT INTO storage.buckets (id, name, public) VALUES ('news-photos', 'news-photos', true);

-- Create policies for news photos storage
CREATE POLICY "Allow public read access to news photos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'news-photos');

CREATE POLICY "Only coordenacao can upload news photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'news-photos');

CREATE POLICY "Only coordenacao can update news photos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'news-photos');

CREATE POLICY "Only coordenacao can delete news photos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'news-photos');

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_news_updated_at
BEFORE UPDATE ON public.news
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();