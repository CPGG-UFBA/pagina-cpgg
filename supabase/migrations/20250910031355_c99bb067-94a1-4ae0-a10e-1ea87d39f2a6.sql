-- Update the trigger function to handle unique constraint violations
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  first_name_value text;
  researcher_route_value text;
BEGIN
  -- Extract first name from full_name metadata
  first_name_value := trim(split_part(NEW.raw_user_meta_data ->> 'full_name', ' ', 1));
  
  -- Find researcher route based on first name
  researcher_route_value := NEW.raw_user_meta_data ->> 'researcher_route';
  
  -- Try to insert into user_profiles
  BEGIN
    INSERT INTO public.user_profiles (
      user_id,
      full_name,
      email,
      institution,
      phone,
      first_name,
      researcher_route
    ) VALUES (
      NEW.id,
      NEW.raw_user_meta_data ->> 'full_name',
      NEW.email,
      NEW.raw_user_meta_data ->> 'institution',
      NEW.raw_user_meta_data ->> 'phone',
      first_name_value,
      researcher_route_value
    );
  EXCEPTION
    WHEN unique_violation THEN
      -- If unique constraint is violated, raise an exception that will be caught by Supabase
      RAISE EXCEPTION 'Usuário já cadastrado';
  END;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;