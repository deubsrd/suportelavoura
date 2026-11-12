import { useEffect } from "react";
import { motion } from "framer-motion";

import { LinkCard, type LinkItem } from "@/components/hub/LinkCard";
import { GuideCard } from "@/components/hub/GuideCard";
import { useG4Clicks } from "@/hooks/use-g4-clicks";
import { franchiseHrefFor } from "@/data/units.config";
import { trackPageView } from "@/data/analytics";

const G4_DIAGNOSTICO_HREF = "/g4-valley/index.html";

const personalLinks: LinkItem[] = [
  {
    label: "Onde sua empresa trava?",
    description: "Diagnóstico gratuito + resumos do G4 Valley 2026",
    href: G4_DIAGNOSTICO_HREF,
    icon: "insight",
    internal: true,
    highlight: true,
    badge: "Grátis",
    trackingId: "deubson_diagnostico_g4",
  },
  {
    label: "Seja um Franqueado",
    description: "Abra a sua lavanderia de autosserviço Lavoura",
    href: franchiseHrefFor("deubson"),
    icon: "franchise",
    trackingId: "deubson_franqueado",
  },
];

const whatsappLink: LinkItem = {
  label: "Fale comigo",
  description: "Palestras, parcerias e mentoria",
  href: "https://wa.me/5592991176452",
  icon: "chat",
  trackingId: "deubson_whatsapp",
};

/* ── Página do perfil pessoal (bio do Instagram) ───────────── */
export default function Deubson() {
  const { count, registerClick } = useG4Clicks();

  useEffect(() => {
    trackPageView();
    const previous = document.title;
    document.title = "Deubson Albuquerque";
    return () => { document.title = previous; };
  }, []);

  return (
    <div className="page-root page-root-personal">
      <div className="personal-hero">
        <img
          className="personal-photo"
          src="/lovable-uploads/albuquerque-g4-valley.jpg"
          alt="Deubson Albuquerque no G4 Valley 2026"
          width={1280}
          height={854}
        />
        <div className="personal-photo-veil" aria-hidden="true" />
        <div className="personal-hero-text">
        <motion.p
          className="personal-eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Empresário · Fundador da Lavoura
        </motion.p>

        <motion.h1
          className="personal-name"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
        >
          <span className="personal-first">Deubson</span>
          <span className="personal-keyword">
            Albuquerque<span className="personal-dot">.</span>
          </span>
        </motion.h1>
        </div>
      </div>

      <div className="links-section">
        <p className="g4-counter">
          <b>{count.toLocaleString("pt-BR")}</b> pessoas já receberam os resumos
        </p>
        {personalLinks.map((link, i) => (
          <LinkCard
            key={link.trackingId}
            link={link.trackingId === "deubson_diagnostico_g4" ? { ...link, onClick: registerClick } : link}
            index={i}
          />
        ))}
        <GuideCard index={personalLinks.length} />
        <LinkCard link={whatsappLink} index={personalLinks.length + 1} />
      </div>

      <motion.p
        className="page-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        © {new Date().getFullYear()} Deubson Albuquerque
      </motion.p>
    </div>
  );
}
