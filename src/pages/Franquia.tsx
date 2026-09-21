import { useEffect } from "react";
import { motion } from "framer-motion";

import { Particles, HeroWord } from "@/components/hub/Hero";
import { LinkCard, type LinkItem } from "@/components/hub/LinkCard";
import { PressCard } from "@/components/hub/PressCard";
import { FRANCHISE_HREF } from "@/data/units.config";
import { pressItems } from "@/data/press.config";
import { trackPageView } from "@/data/analytics";

const franchiseLink: LinkItem = {
  label: "Seja um Franqueado",
  href: FRANCHISE_HREF,
  icon: "franchise",
  highlight: true,
  trackingId: "franquia_franqueado",
};

/* ── Página da franqueadora (bio do Instagram) ─────────────── */
export default function Franquia() {
  useEffect(() => { trackPageView(); }, []);

  return (
    <div className="page-root">
      <div className="hero-section">
        <Particles />

        <div className="hero-circles" aria-hidden="true">
          <span className="hero-circle hero-circle-1" />
          <span className="hero-circle hero-circle-2" />
        </div>

        <motion.div
          className="logo-wrap"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 80, damping: 14, delay: 0.05 }}
        >
          <img
            src="/lovable-uploads/fcf9fc5b-331b-4bca-9b23-23ba236493d6.png"
            alt="Lavanderia Lavoura"
            width={160}
            height={160}
            className="logo-img"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <HeroWord />
        </motion.div>

        <motion.div
          className="hero-status"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <span className="status-dot" aria-hidden="true" />
          Franquia Lavoura
        </motion.div>
      </div>

      <div className="links-section">
        <LinkCard link={franchiseLink} index={0} />
        <PressCard items={pressItems} index={1} />
      </div>

      <motion.p
        className="page-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        © {new Date().getFullYear()} Lavanderia Lavoura
      </motion.p>
    </div>
  );
}
