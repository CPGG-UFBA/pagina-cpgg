-- Configurar o usuário cpggadm@gmail.com como coordenação
DO $$
DECLARE
  result jsonb;
BEGIN
  result := public.create_admin_from_panel('cpggadm@gmail.com', 'coordenacao');
  RAISE NOTICE 'Result: %', result;
END $$;