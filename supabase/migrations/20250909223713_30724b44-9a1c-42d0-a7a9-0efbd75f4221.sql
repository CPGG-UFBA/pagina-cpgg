-- Create research_projects table
CREATE TABLE public.research_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  funding_agency TEXT NOT NULL,
  validity_period TEXT NOT NULL,
  coordinator TEXT NOT NULL,
  vice_coordinator TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.research_projects ENABLE ROW LEVEL SECURITY;

-- Create policies for research_projects
CREATE POLICY "Allow public read access to research_projects" 
ON public.research_projects 
FOR SELECT 
USING (true);

CREATE POLICY "Only coordenacao can insert research_projects" 
ON public.research_projects 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Only coordenacao can update research_projects" 
ON public.research_projects 
FOR UPDATE 
USING (true);

CREATE POLICY "Only coordenacao can delete research_projects" 
ON public.research_projects 
FOR DELETE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_research_projects_updated_at
BEFORE UPDATE ON public.research_projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();