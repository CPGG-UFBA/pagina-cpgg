-- Create storage policies for news-photos bucket to allow admin users to upload
-- Policy to allow public read access to news photos
CREATE POLICY "Public can view news photos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'news-photos');

-- Policy to allow coordenacao users to upload news photos
CREATE POLICY "Coordenacao can upload news photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'news-photos');

-- Policy to allow coordenacao users to update news photos
CREATE POLICY "Coordenacao can update news photos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'news-photos');

-- Policy to allow coordenacao users to delete news photos
CREATE POLICY "Coordenacao can delete news photos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'news-photos');