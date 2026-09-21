import { useEffect } from "react";
import { motion } from "framer-motion";
import { Newspaper, Instagram } from "lucide-react";

import { Particles, HeroWord } from "@/components/hub/Hero";
import { LinkCard, type LinkItem } from "@/components/hub/LinkCard";
import { ExpandableLinksCard } from "@/components/hub/ExpandableLinksCard";
import { FRANCHISE_HREF } from "@/data/units.config";
import { pressItems } from "@/data/press.config";
import { instagramItems } from "@/data/instagram.config";
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
    <div className="page-root page-root-light">
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
            src="/lovable-uploads/logo-horizontal-verde.svg"
            alt="Lavanderia Lavoura"
            width={260}
            height={78}
            className="logo-img logo-img-horizontal"
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
        <ExpandableLinksCard icon={Newspaper} label="O que falam sobre nós" items={pressItems} index={1} />
        <ExpandableLinksCard icon={Instagram} label="Acompanhe nossas unidades" items={instagramItems} index={2} />
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
