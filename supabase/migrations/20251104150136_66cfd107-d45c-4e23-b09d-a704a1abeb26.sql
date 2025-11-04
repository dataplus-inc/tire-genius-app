-- Add additional services fields to quotes table
ALTER TABLE public.quotes
ADD COLUMN wheel_alignment BOOLEAN DEFAULT FALSE,
ADD COLUMN oil_change BOOLEAN DEFAULT FALSE,
ADD COLUMN quote_amount DECIMAL(10, 2),
ADD COLUMN quote_notes TEXT;