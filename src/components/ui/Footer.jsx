import { Github, Linkedin, Mail } from "lucide-react";
import { cn } from "./cn";
import { useI18n } from "../../i18n";

const Footer = ({ className }) => {
  const { t } = useI18n();
  const links = [
    { icon: Mail, label: t("footer.email"), href: "mailto:hola@portafolio.com" },
    { icon: Linkedin, label: t("footer.linkedin"), href: "https://linkedin.com" },
    { icon: Github, label: t("footer.github"), href: "https://github.com" },
  ];

  return (
    <footer
      className={cn(
        "border-t border-glass/2 bg-linear-100/60 backdrop-blur-10",
        "text-mist shadow-inner shadow-black/30",
        className
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.3em] text-mist/60">
            {t("footer.tagline")}
          </p>
          <h3 className="text-lg font-semibold">{t("footer.title")}</h3>
          <p className="text-sm text-mist/70">{t("footer.description")}</p>
        </div>
        <div className="flex items-center gap-3">
          {links.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-glass/2 bg-white/10 text-mist transition hover:-translate-y-1 hover:shadow-glass-sm"
              aria-label={label}
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
