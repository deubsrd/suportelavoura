import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Headphones, Building2 } from "lucide-react";
import { links, type LinkItem } from "@/data/links.config";
import { trackLinkClick, trackPageView } from "@/data/analytics";

const iconMap = {
  franchise: Building2,
  map: MapPin,
  support: Headphones,
} as const;

const HERO_WORDS = ["café", "brinquedoteca", "coworking", "carinho", "conforto", "experiência"];

function HeroWord() {
  const words = useMemo(() => HERO_WORDS, []);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % words.length);
    }, 2200);
    return () => clearTimeout(id);
  }, [index, words]);

  return (
    <div className="hero-word-row">
      <span className="hero-static">Lavoura tem</span>
      <span className="hero-word-slot" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            className="hero-word"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -32 }}
            transition={{ type: "spring", stiffness: 60, damping: 14 }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
      <div className="hero-dots">
        {words.map((_, i) => (
          <span key={i} className={`hero-dot${i === index ? " hero-dot-active" : ""}`} />
        ))}
      </div>
    </div>
  );
}

function LinkCard({ link, index }: { link: LinkItem; index: number }) {
  const Icon = iconMap[link.icon];

  const isWa = link.trackingId === "suporte_whatsapp";

  const cardClass = [
    "link-card-v2",
    link.highlight ? "link-card-cta" : isWa ? "link-card-wa" : "link-card-default",
    link.disabled ? "link-card-disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

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
    return (
      <div aria-disabled="true" className={cardClass} style={style}>
        {content}
      </div>
    );
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

export default function Index() {
  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <div className="page-root">
      <div className="hero-section">
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
            width={64}
            height={64}
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
          24h · aberto agora
        </motion.div>
      </div>

      <div className="links-section">
        {links.map((link, i) => (
          <LinkCard key={link.trackingId} link={link} index={i} />
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
