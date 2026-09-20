import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

import { trackLinkClick } from "@/data/analytics";
import type { Unit } from "@/data/units.config";

const MotionLink = motion(Link);

/** Card que leva à página de uma unidade (navegação interna). */
export function UnitCard({ unit, index }: { unit: Unit; index: number }) {
  const isOpen = unit.status === "open";

  const style = {
    animationDelay: `${0.18 + index * 0.09}s`,
    opacity: 0,
  } as React.CSSProperties;

  const content = (
    <>
      <span className="lc-icon" aria-hidden="true">
        <MapPin className="h-[18px] w-[18px]" />
      </span>
      <span className="lc-label">{unit.name}</span>
      {isOpen ? (
        <span className="lc-arrow" aria-hidden="true">↗</span>
      ) : (
        <span className="lc-badge">Em breve</span>
      )}
    </>
  );

  if (!isOpen) {
    return (
      <div aria-disabled="true" className="link-card-v2 link-card-default link-card-disabled" style={style}>
        {content}
      </div>
    );
  }

  return (
    <MotionLink
      to={`/${unit.slug}`}
      className="link-card-v2 link-card-default"
      style={style}
      onClick={() => trackLinkClick(`${unit.slug}_unidade`, unit.name)}
      whileHover={{ scale: 1.035, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 340, damping: 20 }}
    >
      {content}
    </MotionLink>
  );
}
