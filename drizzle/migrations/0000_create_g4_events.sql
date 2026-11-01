CREATE TABLE public.g4_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  kind text NOT NULL CHECK (kind IN ('download', 'diagnostico')),
  file text CHECK (file IS NULL OR char_length(file) <= 80)
);

GRANT INSERT ON public.g4_events TO anon;
GRANT ALL ON public.g4_events TO service_role;

ALTER TABLE public.g4_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon can only insert g4 events"
ON public.g4_events
FOR INSERT
TO anon
WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.g4_download_count()
RETURNS bigint
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT count(*) FROM public.g4_events WHERE kind = 'download';
$$;

GRANT EXECUTE ON FUNCTION public.g4_download_count() TO anon;