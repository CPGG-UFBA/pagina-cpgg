-- Atualizar constraint para incluir reservas de equipamentos LAIGA
ALTER TABLE public.reservations DROP CONSTRAINT reservations_tipo_reserva_check;
ALTER TABLE public.reservations ADD CONSTRAINT reservations_tipo_reserva_check 
CHECK (tipo_reserva = ANY (ARRAY['auditorio'::text, 'sala_reuniao'::text, 'laiga_equipments'::text]));