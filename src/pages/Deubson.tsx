import { useEffect } from "react";
import { motion } from "framer-motion";

import { LinkCard, type LinkItem } from "@/components/hub/LinkCard";
import { FRANCHISE_HREF } from "@/data/units.config";
import { trackPageView } from "@/data/analytics";

const G4_DIAGNOSTICO_HREF = "https://claude.ai/artifact/YToWZDeU7HTDwqfYu6PkFw#diagnostico";

const personalLinks: LinkItem[] = [
  {
    label: "Onde sua empresa trava?",
    description: "Diagnóstico gratuito + resumos do G4 Valley 2026",
    href: G4_DIAGNOSTICO_HREF,
    icon: "insight",
    highlight: true,
    badge: "Grátis",
    trackingId: "deubson_diagnostico_g4",
  },
  {
    label: "Seja um Franqueado",
    description: "Abra a sua lavanderia de autosserviço Lavoura",
    href: FRANCHISE_HREF,
    icon: "franchise",
    trackingId: "deubson_franqueado",
  },
];

/* ── Página do perfil pessoal (bio do Instagram) ───────────── */
export default function Deubson() {
  useEffect(() => {
    trackPageView();
    const previous = document.title;
    document.title = "Deubson Albuquerque";
    return () => { document.title = previous; };
  }, []);

  return (
    <div className="page-root page-root-personal">
      <div className="personal-hero">
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

      <div className="links-section">
        {personalLinks.map((link, i) => (
          <LinkCard key={link.trackingId} link={link} index={i} />
        ))}
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
