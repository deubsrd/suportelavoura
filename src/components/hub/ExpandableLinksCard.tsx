import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, type LucideIcon } from "lucide-react";

import { trackLinkClick } from "@/data/analytics";

export type ExpandableLinkItem = {
  label: string;
  href: string;
  trackingId: string;
};

/** Card expansível genérico com uma lista de links externos. */
export function ExpandableLinksCard({
  icon: Icon,
  label,
  items,
  index,
}: {
  icon: LucideIcon;
  label: string;
  items: ExpandableLinkItem[];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const style = {
    animationDelay: `${0.18 + index * 0.09}s`,
    opacity: 0,
  } as React.CSSProperties;

  return (
    <div className="coffee-card" style={style}>
      <button
        type="button"
        className="coffee-card-header"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="lc-icon coffee-icon" aria-hidden="true">
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <span className="lc-label">{label}</span>
        <ChevronDown
          className={`h-4 w-4 coffee-chevron${open ? " coffee-chevron-open" : ""}`}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="coffee-card-body-wrap"
          >
            <div className="coffee-card-body press-card-body">
              {items.map((item) => (
                <a
                  key={item.trackingId}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press-link"
                  onClick={() => trackLinkClick(item.trackingId, item.label)}
                >
                  {item.label}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
