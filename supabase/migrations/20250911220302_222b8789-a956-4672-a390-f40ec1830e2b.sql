-- Delete all LAIGA laboratory reservation test data
DELETE FROM public.reservations 
WHERE tipo_reserva = 'laiga_equipments';