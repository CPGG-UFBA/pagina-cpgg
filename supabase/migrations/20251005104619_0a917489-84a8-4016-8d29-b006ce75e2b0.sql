-- Add is_chief column to researchers table
ALTER TABLE public.researchers 
ADD COLUMN is_chief boolean NOT NULL DEFAULT false;

-- Create index for better query performance
CREATE INDEX idx_researchers_program_chief 
ON public.researchers(program, is_chief);

-- Create function to ensure only one chief per program
CREATE OR REPLACE FUNCTION public.set_researcher_as_chief(
  _researcher_id uuid,
  _program text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Remove chief status from all researchers in the program
  UPDATE public.researchers
  SET is_chief = false
  WHERE program = _program AND is_chief = true;
  
  -- Set the specified researcher as chief
  UPDATE public.researchers
  SET is_chief = true
  WHERE id = _researcher_id;
END;
$$;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION public.set_researcher_as_chief TO authenticated;