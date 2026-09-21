// ─────────────────────────────────────────────────────────────────────────────
// instagram.config.ts
// Instagrams das unidades. Exibidos no card "Acompanhe nossas unidades"
// da página /franquia. Para adicionar/editar um perfil, edite só este arquivo.
// ─────────────────────────────────────────────────────────────────────────────

export type InstagramItem = {
  label: string;
  href: string;
  trackingId: string;
};

export const instagramItems: InstagramItem[] = [
  {
    label: "Unidade Liberdade",
    href: "https://www.instagram.com/lavanderialavourabv/",
    trackingId: "instagram_liberdade",
  },
  {
    label: "Unidade Jardim Primavera",
    href: "https://www.instagram.com/lavanderialavoura_jd_primavera?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
    trackingId: "instagram_primavera",
  },
  {
    label: "Unidade Caimbé",
    href: "https://www.instagram.com/lavanderialavouracaimbebv/",
    trackingId: "instagram_caimbe",
  },
];
