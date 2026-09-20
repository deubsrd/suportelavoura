import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, ChevronDown } from "lucide-react";

export function CoffeeCard({ index }: { index: number }) {
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
          <Coffee className="h-[18px] w-[18px]" />
        </span>
        <span className="lc-label">Café Grátis</span>
        <span className="lc-badge coffee-badge">Cortesia</span>
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
              <p>
                ☕ Café coado e espresso são cortesias da Lavoura para clientes
                que estão utilizando nossos serviços de lavagem e secagem.
              </p>
              <p>
                Para solicitar o seu café gratuitamente, basta entrar em contato
                com nosso WhatsApp que nossa equipe fará a liberação. 😊
              </p>
              <p>
                Essa medida garante que o benefício esteja sempre disponível
                para quem está utilizando a lavanderia. Obrigado pela
                compreensão!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
