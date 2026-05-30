// ─────────────────────────────────────────────────────────────────────────────
// src/pages/Index.tsx
// O que mudou vs. versão anterior:
//   • Links vêm de src/data/links.config.ts (não mais hardcoded aqui)
//   • trackLinkClick() e trackPageView() chamados via src/data/analytics.ts
//   • Ícones mapeados internamente — sem importar todos de uma vez
//   • NotFound localizado (pt-BR)
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect } from "react";
import { MapPin, Headphones, Building2 } from "lucide-react";
import { links, type LinkItem } from "@/data/links.config";
import { trackLinkClick, trackPageView } from "@/data/analytics";

const iconMap = {
  franchise: Building2,
  map: MapPin,
  support: Headphones,
} as const;

function LinkCard({ link, index }: { link: LinkItem; index: number }) {
  const Icon = iconMap[link.icon];

  const className = [
    "animate-fade-in-up",
    link.highlight
      ? "link-card !border-accent !bg-accent !text-accent-foreground font-semibold"
      : "link-card",
    link.disabled ? "opacity-50 cursor-not-allowed pointer-events-none grayscale" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const style = {
    animationDelay: `${0.25 + index * 0.1}s`,
    opacity: 0,
  } as React.CSSProperties;

  const content = (
    <span className="flex items-center justify-center gap-3">
      <Icon className="h-5 w-5" aria-hidden="true" />
      {link.label}
      {link.badge && (
        <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          {link.badge}
        </span>
      )}
    </span>
  );

  if (link.disabled) {
    return (
      <div key={link.label} aria-disabled="true" className={className} style={style}>
        {content}
      </div>
    );
  }

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      onClick={() => trackLinkClick(link.trackingId, link.label)}
    >
      {content}
    </a>
  );
}

const Index = () => {
  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-background px-4 py-12">
      {/* Logo */}
      <div className="animate-fade-in-up mb-2">
        <img
          src="/lovable-uploads/fcf9fc5b-331b-4bca-9b23-23ba236493d6.png"
          alt="Lavanderia Lavoura"
          width={180}
          height={180}
          className="mx-auto"
        />
      </div>

      {/* Subtítulo */}
      <div
        className="animate-fade-in-up mb-8 flex items-center gap-2 text-muted-foreground text-sm"
        style={{ animationDelay: "0.1s", opacity: 0 }}
      >
        <span aria-hidden="true">🕐</span>
        Funcionamento 24 horas
      </div>

      {/* Links */}
      <div className="flex w-full max-w-md flex-col gap-4">
        {links.map((link, i) => (
          <LinkCard key={link.trackingId} link={link} index={i} />
        ))}
      </div>

      {/* Footer */}
      <p
        className="animate-fade-in-up mt-14 text-xs text-muted-foreground"
        style={{ animationDelay: "0.7s", opacity: 0 }}
      >
        © {new Date().getFullYear()} Lavanderia Lavoura
      </p>
    </div>
  );
};

export default Index;
