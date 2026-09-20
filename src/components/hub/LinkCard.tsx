import { motion } from "framer-motion";
import { MapPin, Headphones, Building2 } from "lucide-react";

import { trackLinkClick } from "@/data/analytics";

export type LinkItem = {
  label: string;
  href: string;
  icon: "franchise" | "map" | "support";
  highlight?: boolean;       // destaque visual (botão laranja)
  disabled?: boolean;        // exibe badge "Em breve"
  badge?: string;            // texto do badge opcional
  trackingId: string;        // usado nos eventos de analytics (Meta Pixel / GA)
};

const iconMap = {
  franchise: Building2,
  map: MapPin,
  support: Headphones,
} as const;

export function LinkCard({ link, index }: { link: LinkItem; index: number }) {
  const Icon = iconMap[link.icon];
  const isWa = link.icon === "support";

  const cardClass = [
    "link-card-v2",
    link.highlight ? "link-card-cta" : isWa ? "link-card-wa" : "link-card-default",
    link.disabled ? "link-card-disabled" : "",
  ].filter(Boolean).join(" ");

  const style = {
    animationDelay: `${0.18 + index * 0.09}s`,
    opacity: 0,
  } as React.CSSProperties;

  const content = (
    <>
      <span className="lc-icon" aria-hidden="true">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <span className="lc-label">{link.label}</span>
      {link.badge ? (
        <span className="lc-badge">{link.badge}</span>
      ) : (
        <span className="lc-arrow" aria-hidden="true">↗</span>
      )}
    </>
  );

  if (link.disabled) {
    return <div aria-disabled="true" className={cardClass} style={style}>{content}</div>;
  }

  return (
    <motion.a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClass}
      style={style}
      onClick={() => trackLinkClick(link.trackingId, link.label)}
      whileHover={{ scale: 1.035, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 340, damping: 20 }}
    >
      {content}
    </motion.a>
  );
}
