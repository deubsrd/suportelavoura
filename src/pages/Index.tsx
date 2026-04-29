import { MapPin, Headphones, Building2, Clock } from "lucide-react";


const links = [
  {
    label: "Seja um Franqueado",
    href: "https://www.lavanderialavoura.com.br/",
    icon: Building2,
    highlight: true,
  },
  {
    label: "Unidade Liberdade",
    href: "https://maps.app.goo.gl/GtHfM6evjMdkoxm29",
    icon: MapPin,
  },
  {
    label: "Unidade Jardim Primavera",
    href: "https://maps.app.goo.gl/QRqtW4dqMxfeqjT69",
    icon: MapPin,
  },
  {
    label: "Unidade Raiar do Sol",
    href: "#",
    icon: MapPin,
    disabled: true,
    badge: "Em breve",
  },
  {
    label: "Suporte",
    href: "https://wa.me/5595991535738",
    icon: Headphones,
  },
];

const Index = () => {
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

      {/* Subtitle */}
      <div
        className="animate-fade-in-up mb-8 flex items-center gap-2 text-muted-foreground text-sm"
        style={{ animationDelay: "0.1s", opacity: 0 }}
      >
        <Clock className="h-4 w-4 text-accent" />
        Funcionamento 24 horas
      </div>

      {/* Links */}
      <div className="flex w-full max-w-md flex-col gap-4">
        {links.map((link, i) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`animate-fade-in-up ${
                link.highlight
                  ? "link-card !border-accent !bg-accent !text-accent-foreground font-semibold"
                  : "link-card"
              }`}
              style={{ animationDelay: `${0.25 + i * 0.1}s`, opacity: 0 }}
            >
              <span className="flex items-center justify-center gap-3">
                <Icon className="h-5 w-5" />
                {link.label}
              </span>
            </a>
          );
        })}
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
