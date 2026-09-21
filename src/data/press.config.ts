// ─────────────────────────────────────────────────────────────────────────────
// press.config.ts
// Matérias e menções na imprensa. Exibidas no card "O que falam sobre nós"
// da página /franquia. Para adicionar uma nova matéria, edite só este arquivo.
// ─────────────────────────────────────────────────────────────────────────────

export type PressItem = {
  label: string;
  href: string;
  trackingId: string;
};

export const pressItems: PressItem[] = [
  {
    label: "Na Hora do Brasil",
    href: "https://www.nahoradobrasil.com.br/2026/09/lavanderias-de-autosservico-passam-de-3.html",
    trackingId: "imprensa_nahoradobrasil",
  },
  {
    label: "Empreender Brasília",
    href: "https://www.empreenderbrasilia.com.br/2026/09/lavoura-franquia-de-autosservico.html",
    trackingId: "imprensa_empreenderbrasilia",
  },
];
