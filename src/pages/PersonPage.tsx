import { useEffect } from "react";
import { motion } from "framer-motion";

import { LinkCard, type LinkItem } from "@/components/hub/LinkCard";
import { GuideCard } from "@/components/hub/GuideCard";
import { trackPageView } from "@/data/analytics";

/* Página de bio no mesmo modelo da /albuquerque, para os outros perfis da rede
   de influenciadores (Gabriel, Mateus...). Cada perfil é só um objeto de config. */

export type PersonConfig = {
  /** Usado nos ids de rastreio e na origem do lead (instagram-<slug>). */
  slug: string;
  firstName: string;
  lastName: string;
  eyebrow: string;
  /** Foto do topo (em /public/lovable-uploads). Sem foto, o topo fica só com o nome. */
  photo?: { src: string; alt: string; position?: string };
  /** Cards antes do guia. */
  links: LinkItem[];
  /** Cards depois do guia. */
  after?: LinkItem[];
};

export default function PersonPage({ person }: { person: PersonConfig }) {
  useEffect(() => {
    trackPageView();
    const previous = document.title;
    document.title = `${person.firstName} ${person.lastName}`;
    return () => {
      document.title = previous;
    };
  }, [person]);

  const after = person.after ?? [];

  return (
    <div className="page-root page-root-personal">
      <div className={`personal-hero${person.photo ? "" : " personal-hero-nophoto"}`}>
        {person.photo && (
          <>
            <img
              className="personal-photo"
              src={person.photo.src}
              alt={person.photo.alt}
              style={person.photo.position ? { objectPosition: person.photo.position } : undefined}
            />
            <div className="personal-photo-veil" aria-hidden="true" />
          </>
        )}
        <div className="personal-hero-text">
          <motion.p
            className="personal-eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            {person.eyebrow}
          </motion.p>

          <motion.h1
            className="personal-name"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          >
            <span className="personal-first">{person.firstName}</span>
            <span className="personal-keyword">
              {person.lastName}
              <span className="personal-dot">.</span>
            </span>
          </motion.h1>
        </div>
      </div>

      <div className="links-section">
        {person.links.map((link, i) => (
          <LinkCard key={link.trackingId} link={link} index={i} />
        ))}
        <GuideCard
          index={person.links.length}
          trackingId={`${person.slug}_guia_lead`}
          source={`instagram-${person.slug}`}
        />
        {after.map((link, i) => (
          <LinkCard key={link.trackingId} link={link} index={person.links.length + 1 + i} />
        ))}
      </div>

      <motion.p
        className="page-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        © {new Date().getFullYear()} {person.firstName} {person.lastName} · Lavoura
      </motion.p>
    </div>
  );
}
