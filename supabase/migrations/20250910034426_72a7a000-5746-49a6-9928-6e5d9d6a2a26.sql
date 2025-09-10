-- Create the missing user profile for Marcos
INSERT INTO public.user_profiles (
  user_id,
  full_name, 
  email,
  institution,
  phone,
  first_name,
  researcher_route
) VALUES (
  'e1158ea4-bbac-4948-97c4-ab04dd41846b',
  'Marcos Alberto Rodrigues Vasconcelos',
  'marcos.vasconcelos@ufba.br', 
  'UFBA',
  '71997018150',
  'Marcos',
  '/researchers/personal/Marcos'
)
ON CONFLICT (user_id) DO NOTHING;