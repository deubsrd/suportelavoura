// ─────────────────────────────────────────────────────────────────────────────
// links.config.ts
// Fonte única de dados do Link Hub. Para adicionar/remover unidades ou links,
// edite APENAS este arquivo — nenhum componente precisa ser tocado.
// ─────────────────────────────────────────────────────────────────────────────

export type LinkItem = {
  label: string;
  href: string;
  icon: "franchise" | "map" | "support";
  highlight?: boolean;       // destaque visual (botão laranja)
  disabled?: boolean;        // exibe badge "Em breve"
  badge?: string;            // texto do badge opcional
  trackingId: string;        // usado nos eventos de analytics (Meta Pixel / GA)
};

export const links: LinkItem[] = [
  {
    label: "Seja um Franqueado",
    href: "https://www.lavanderialavoura.com.br/",
    icon: "franchise",
    highlight: true,
    trackingId: "cta_franqueado",
  },
  {
    label: "Unidade Liberdade",
    href: "https://maps.app.goo.gl/GtHfM6evjMdkoxm29",
    icon: "map",
    trackingId: "unidade_liberdade",
  },
  {
    label: "Unidade Jardim Primavera",
    href: "https://maps.app.goo.gl/QRqtW4dqMxfeqjT69",
    icon: "map",
    trackingId: "unidade_primavera",
  },
  {
    label: "Unidade Raiar do Sol",
    href: "#",
    icon: "map",
    disabled: true,
    badge: "Em breve",
    trackingId: "unidade_raiar",
  },
  {
    label: "Unidade Caimbé",
    href: "#",
    icon: "map",
    disabled: true,
    badge: "Em breve",
    trackingId: "unidade_caimbe",
  },
  {
    label: "Suporte",
    href: "https://wa.me/5595991535738",
    icon: "support",
    trackingId: "suporte_whatsapp",
  },
];
