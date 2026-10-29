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
    label: "Folha de Boa Vista",
    href: "https://www.folhabv.com.br/cotidiano/do-cafezinho-ao-autosservico-empresarios-reinventam-conceito-de-lavanderia-e-criam-franquia-em-roraima/",
    trackingId: "imprensa_folhabv",
  },
  {
    label: "G1 Roraima",
    href: "https://g1.globo.com/google/amp/rr/roraima/videos-jornal-de-roraima-2-edicao/video/lavanderia-de-autosservico-criada-em-boa-vista-aposta-em-franquias-para-expandir-negocio-15056063.ghtml",
    trackingId: "imprensa_g1rr",
  },
  {
    label: "Isso é Paraná",
    href: "https://www.issoeparana.com.br/2026/09/lavoura-planeja-expandir-franquia-de.html",
    trackingId: "imprensa_issoeparana",
  },
];
