-- Dropar função antiga
DROP FUNCTION IF EXISTS public.list_all_user_profiles();

-- Recriar função com public_id incluído
CREATE FUNCTION public.list_all_user_profiles()
RETURNS TABLE(
  id uuid, 
  full_name text, 
  email text, 
  institution text, 
  phone text, 
  user_id uuid, 
  researcher_route text,
  public_id text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    up.id, 
    up.full_name, 
    up.email, 
    up.institution, 
    up.phone, 
    up.user_id, 
    up.researcher_route,
    up.public_id
  FROM public.user_profiles up
  ORDER BY lower(up.full_name) ASC;
$$;