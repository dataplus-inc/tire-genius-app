-- Add suggested date and time fields to appointments table
ALTER TABLE public.appointments 
ADD COLUMN suggested_date date,
ADD COLUMN suggested_time text;