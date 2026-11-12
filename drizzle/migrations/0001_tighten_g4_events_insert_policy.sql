DROP POLICY IF EXISTS "anon can only insert g4 events" ON public.g4_events;
CREATE POLICY "anon can only insert g4 events" ON public.g4_events
FOR INSERT TO anon
WITH CHECK (
  kind IN ('download','diagnostico')
  AND (file IS NULL OR char_length(file) <= 80)
  AND created_at >= now() - interval '1 minute'
  AND created_at <= now() + interval '1 minute'
);