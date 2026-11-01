import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronDown } from "lucide-react";

import { LeadForm } from "@/components/hub/LeadForm";
import {
  GUIDE_DISCLAIMER,
  GUIDE_GUARANTEE,
  GUIDE_INCLUDED,
  GUIDE_STATS,
} from "@/data/guide.config";

/** Card expansível: mini guia da franquia + formulário de interesse. */
export function GuideCard({ index }: { index: number }) {
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
          <BookOpen className="h-[18px] w-[18px]" />
        </span>
        <span className="lc-label">
          Como abrir uma lavanderia de autosserviço
          <span className="lc-desc">Guia rápido com os números da franquia</span>
        </span>
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
            <div className="coffee-card-body">
              <div className="guide-stats">
                {GUIDE_STATS.map((s) => (
                  <div key={s.label} className="guide-stat">
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>

              <p><b>Já incluso:</b> {GUIDE_INCLUDED}</p>
              <p>{GUIDE_GUARANTEE}</p>
              <p className="guide-disclaimer">{GUIDE_DISCLAIMER}</p>

              <h3 className="guide-form-title">Receba as condições completas</h3>
              <LeadForm trackingId="deubson_guia_lead" source="instagram-deubson" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
