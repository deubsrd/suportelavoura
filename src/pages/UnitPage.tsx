import { useEffect } from "react";
import { motion } from "framer-motion";

import { Particles, HeroWord } from "@/components/hub/Hero";
import { LinkCard, type LinkItem } from "@/components/hub/LinkCard";
import { CoffeeCard } from "@/components/hub/CoffeeCard";
import { UnitCard } from "@/components/hub/UnitCard";
import { FRANCHISE_HREF, units, type Unit } from "@/data/units.config";
import { trackPageView } from "@/data/analytics";

/* ── Página de uma unidade específica ──────────────────────── */
export default function UnitPage({ unit }: { unit: Unit }) {
  useEffect(() => { trackPageView(); }, [unit.slug]);

  const isOpen = unit.status === "open";
  const otherUnits = units.filter((u) => u.slug !== unit.slug);

  const unitLinks: LinkItem[] = [
    {
      label: "Seja um Franqueado",
      href: FRANCHISE_HREF,
      icon: "franchise",
      highlight: true,
      trackingId: `${unit.slug}_franqueado`,
    },
    ...(isOpen
      ? [
          {
            label: unit.name,
            href: unit.mapHref,
            icon: "map" as const,
            trackingId: `${unit.slug}_mapa`,
          },
          {
            label: "Suporte",
            href: `https://wa.me/${unit.whatsapp}`,
            icon: "support" as const,
            trackingId: `${unit.slug}_suporte_whatsapp`,
          },
        ]
      : []),
  ];

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
          <span className={`status-dot${isOpen ? "" : " status-dot-soon"}`} aria-hidden="true" />
          {unit.name} · {isOpen ? "aberto agora" : "em breve"}
        </motion.div>
      </div>

      <div className="links-section">
        {unitLinks.map((link, i) => (
          <LinkCard key={link.trackingId} link={link} index={i} />
        ))}
        {isOpen && <CoffeeCard index={unitLinks.length} />}
      </div>

      <div className="other-units-section">
        <p className="other-units-heading">Conheça nossas outras unidades</p>
        {otherUnits.map((u, i) => (
          <UnitCard key={u.slug} unit={u} index={i} />
        ))}
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
