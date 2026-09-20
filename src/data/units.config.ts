// ─────────────────────────────────────────────────────────────────────────────
// units.config.ts
// Fonte única de dados das unidades. Para adicionar/editar uma unidade
// (localização, WhatsApp de suporte, status), edite APENAS este arquivo —
// nenhuma página ou componente precisa ser tocado.
// ─────────────────────────────────────────────────────────────────────────────

export type UnitStatus = "open" | "coming-soon";

export type Unit = {
  slug: string;
  name: string;
  mapHref: string;
  /** Número do WhatsApp de suporte, só dígitos com DDI (ex: 5595...). */
  whatsapp?: string;
  status: UnitStatus;
};

export const FRANCHISE_HREF = "https://www.lavanderialavoura.com.br/";

export const units: Unit[] = [
  {
    slug: "liberdade",
    name: "Unidade Liberdade",
    mapHref: "https://maps.app.goo.gl/GtHfM6evjMdkoxm29",
    whatsapp: "5595991535738",
    status: "open",
  },
  {
    slug: "primavera",
    name: "Unidade Jardim Primavera",
    mapHref: "https://maps.app.goo.gl/QRqtW4dqMxfeqjT69",
    whatsapp: "5595984178881",
    status: "open",
  },
  {
    slug: "caimbe",
    name: "Unidade Caimbé",
    mapHref: "https://maps.app.goo.gl/JmSj2VK3WxRrxssj6",
    whatsapp: "5595981124373",
    status: "open",
  },
  {
    slug: "raiar-do-sol",
    name: "Unidade Raiar do Sol",
    mapHref: "#",
    status: "coming-soon",
  },
];
