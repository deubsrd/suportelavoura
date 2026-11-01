import { useCallback, useEffect, useState } from "react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

// Pessoas que já receberam o material por outros canais, somadas aos cliques reais.
export const G4_BASE_COUNT = 105;

const CLICKED_FLAG = "g4_link_clicked";

const apiHeaders = (): Record<string, string> => ({
  "Content-Type": "application/json",
  apikey: SUPABASE_KEY ?? "",
  ...(SUPABASE_KEY?.startsWith("sb_") ? {} : { Authorization: `Bearer ${SUPABASE_KEY}` }),
});

/** Na tabela g4_events, kind "download" = clique no card "Onde sua empresa trava?". */
export const postG4Click = (kind = "download") =>
  fetch(`${SUPABASE_URL}/rest/v1/g4_events`, {
    method: "POST",
    headers: { ...apiHeaders(), Prefer: "return=minimal" },
    body: JSON.stringify({ kind }),
    keepalive: true,
  });

/** Lê o total de cliques reais e registra 1 clique por navegador. */
export function useG4Clicks() {
  const [real, setReal] = useState(0);

  useEffect(() => {
    if (!SUPABASE_URL || !SUPABASE_KEY) return;
    let alive = true;
    fetch(`${SUPABASE_URL}/rest/v1/rpc/g4_download_count`, {
      method: "POST",
      headers: apiHeaders(),
      body: "{}",
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((n) => {
        if (alive && typeof n === "number") setReal(n);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const registerClick = useCallback(() => {
    if (!SUPABASE_URL || !SUPABASE_KEY) return;
    try {
      if (localStorage.getItem(CLICKED_FLAG)) return;
      localStorage.setItem(CLICKED_FLAG, "1");
    } catch {
      /* navegador sem armazenamento: registra mesmo assim */
    }
    postG4Click().catch(() => {});
  }, []);

  return { count: G4_BASE_COUNT + real, registerClick };
}
