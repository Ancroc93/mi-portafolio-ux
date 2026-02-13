import { Github, Linkedin, Mail } from "lucide-react";
import { cn } from "./cn";
import { useI18n } from "../../i18n";

const Footer = ({ className }) => {
  const { t } = useI18n();
  const links = [
    { icon: Mail, label: t("footer.email"), href: `mailto:${t("footer.email")}` },
    { icon: Linkedin, label: t("footer.linkedin"), href: t("footer.linkedinUrl") },
    { icon: Github, label: t("footer.github"), href: t("footer.githubUrl") },
  ];

  return (
    <footer
      className={cn(
        "border-t border-white/10 bg-background/90 backdrop-blur-xl",
        "text-secondary shadow-inner shadow-black/30",
        className
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.3em] text-secondary/70">
            {t("footer.tagline")}
          </p>
          <h3 className="text-lg font-semibold text-primary">{t("footer.title")}</h3>
          <p className="text-sm text-secondary/80">{t("footer.description")}</p>
        </div>
        <div className="flex items-center gap-3">
          {links.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-secondary transition hover:-translate-y-1 hover:text-primary hover:border-white/20 hover:bg-white/10"
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
