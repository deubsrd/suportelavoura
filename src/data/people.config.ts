// Páginas de bio da rede de influenciadores (mesmo modelo da /albuquerque).
// O Deubson tem página própria (src/pages/Deubson.tsx) por causa do card do G4 Valley.

import type { PersonConfig } from "@/pages/PersonPage";
import { franchiseHrefFor } from "@/data/units.config";

/** WhatsApp do Mateus (consultor que atende os investidores da rede). */
const MATEUS_WHATSAPP = "5555999462327";

const whatsappMateus = (mensagem: string) =>
  `https://wa.me/${MATEUS_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;

export const gabriel: PersonConfig = {
  slug: "gabriel",
  firstName: "Gabriel",
  lastName: "Florence",
  eyebrow: "Fé · Família · Fundador da Lavoura",
  links: [
    {
      label: "Seja um Franqueado",
      description: "Veja quanto rende uma lavanderia de autosserviço Lavoura",
      href: franchiseHrefFor("gabriel"),
      icon: "franchise",
      highlight: true,
      trackingId: "gabriel_franqueado",
    },
  ],
  after: [
    {
      label: "Fale com um consultor",
      description: "Tire suas dúvidas com o Mateus, da equipe de expansão",
      href: whatsappMateus("Oi Mateus, vim pelo Instagram do Gabriel e quero saber da franquia Lavoura"),
      icon: "chat",
      trackingId: "gabriel_whatsapp_consultor",
    },
  ],
};

export const mateus: PersonConfig = {
  slug: "mateus",
  firstName: "Mateus",
  lastName: "Xavier",
  eyebrow: "Coordenador de Expansão · Lavoura",
  links: [
    {
      label: "Fale comigo no WhatsApp",
      description: "Me conta a sua história e de qual cidade você é",
      href: whatsappMateus("Oi Mateus, vim pelo seu Instagram e quero saber da franquia Lavoura"),
      icon: "chat",
      highlight: true,
      trackingId: "mateus_whatsapp",
    },
    {
      label: "Seja um Franqueado",
      description: "Abra a sua lavanderia de autosserviço Lavoura",
      href: franchiseHrefFor("mateus"),
      icon: "franchise",
      trackingId: "mateus_franqueado",
    },
  ],
};
