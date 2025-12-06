-- Inserir novos equipamentos na tabela laiga_equipment
INSERT INTO public.laiga_equipment (name, description, is_available) VALUES
  ('Bússola Brunton', 'Bússola geológica de precisão', true),
  ('Caminhão de fonte sísmica AWD', 'Caminhão para aquisição sísmica', true),
  ('Caminhonete 4x4', 'Veículo para transporte de equipamentos em campo', true),
  ('Gerador Honda 3,6 KVA', 'Gerador elétrico portátil 3,6 KVA', true),
  ('GPR IDS-RIS MF-HI-MOD', 'Radar de penetração no solo IDS', true),
  ('Martelo de Geólogo', 'Martelo para coleta de amostras geológicas', true),
  ('Percômetro para medidas de condutividade em amostras de testemunho', 'Medidor de condutividade em testemunhos', true),
  ('Perfuratriz para amostragem de solo', 'Equipamento para perfuração e amostragem de solo', true),
  ('Sonar Marinho DE340D e DE680D', 'Sonar para levantamentos marinhos', true)
ON CONFLICT (name) DO NOTHING;