-- Create table for LAIGA equipment
CREATE TABLE public.laiga_equipment (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.laiga_equipment ENABLE ROW LEVEL SECURITY;

-- Create policies for reading (everyone can see equipment)
CREATE POLICY "Anyone can view equipment" 
ON public.laiga_equipment 
FOR SELECT 
USING (true);

-- Create policies for modification (only authenticated users can modify)
CREATE POLICY "Authenticated users can insert equipment" 
ON public.laiga_equipment 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update equipment" 
ON public.laiga_equipment 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete equipment" 
ON public.laiga_equipment 
FOR DELETE 
TO authenticated
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_laiga_equipment_updated_at
BEFORE UPDATE ON public.laiga_equipment
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial equipment data
INSERT INTO public.laiga_equipment (name, description) VALUES
('Elrec Pro', 'Equipamento de resistividade elétrica'),
('Gamaespectrômetro RS125', 'Espectrômetro de raios gama'),
('Gerador Honda EG5500', 'Gerador elétrico portátil'),
('GPR SIR 3000', 'Radar de penetração no solo'),
('GPR SIR 4000', 'Radar de penetração no solo avançado'),
('GPR SIR 20', 'Radar de penetração no solo compacto'),
('GPS diferencial SP60', 'Sistema de posicionamento global diferencial'),
('GPS Etrex10', 'GPS portátil básico'),
('Gravímetro CG5', 'Medidor de gravidade'),
('Magnetômetro Marinho G882', 'Magnetômetro para uso marinho'),
('Magnetômetro Terrestre GSN19', 'Magnetômetro para uso terrestre'),
('Simsógrafo Geode48', 'Sismógrafo de 48 canais'),
('Susceptibilímetro KT10', 'Medidor de susceptibilidade magnética'),
('Syscal Pro', 'Sistema de aquisição multicanal'),
('VLF T-VLF', 'Receptor de frequência muito baixa'),
('V8 Phoenix', 'Sistema de tomografia elétrica');