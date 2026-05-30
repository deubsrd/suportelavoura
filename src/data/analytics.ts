// ─────────────────────────────────────────────────────────────────────────────
// analytics.ts
// Wrapper centralizado de eventos. Dispara tanto no Meta Pixel quanto no GA4
// (se instalados). Para adicionar um novo destino, edite apenas este arquivo.
//
// SETUP:
//   1. Cole o código base do Meta Pixel no index.html (veja comentário lá).
//   2. Cole o snippet do gtag.js no index.html se quiser GA4 também.
//   3. Substitua PIXEL_ID e GA_MEASUREMENT_ID pelos seus IDs reais.
// ─────────────────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

/** Dispara evento de clique num link do hub */
export function trackLinkClick(trackingId: string, label: string) {
  // Meta Pixel — evento customizado
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", "LinkHubClick", {
      link_id: trackingId,
      link_label: label,
    });
  }

  // GA4 — evento customizado
  if (typeof window.gtag === "function") {
    window.gtag("event", "link_hub_click", {
      link_id: trackingId,
      link_label: label,
    });
  }
}

/** Dispara pageview (chamado uma vez no mount da Index) */
export function trackPageView() {
  if (typeof window.fbq === "function") {
    window.fbq("track", "PageView");
  }
  if (typeof window.gtag === "function") {
    window.gtag("event", "page_view");
  }
}
