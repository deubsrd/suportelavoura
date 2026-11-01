import { useCallback, useEffect, useState } from "react";

import {
  G4_CLICKS_URL,
  G4_COUNT_URL,
  insertHeaders,
  leadHeaders,
} from "@/data/lead.config";

// Pessoas que já receberam o material por outros canais, somadas aos cliques reais.
export const G4_BASE_COUNT = 105;

const CLICKED_FLAG = "g4_link_clicked";

/** Lê o total de cliques reais e registra 1 clique por navegador. */
export function useG4Clicks() {
  const [real, setReal] = useState(0);

  useEffect(() => {
    let alive = true;
    fetch(G4_COUNT_URL, { method: "POST", headers: leadHeaders, body: "{}" })
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
    try {
      if (localStorage.getItem(CLICKED_FLAG)) return;
      localStorage.setItem(CLICKED_FLAG, "1");
    } catch {
      /* navegador sem armazenamento: registra mesmo assim */
    }
    fetch(G4_CLICKS_URL, {
      method: "POST",
      headers: insertHeaders,
      body: "{}",
      keepalive: true,
    }).catch(() => {});
  }, []);

  return { count: G4_BASE_COUNT + real, registerClick };
}
