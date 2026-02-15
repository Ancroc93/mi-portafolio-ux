import { cn } from "./cn";
import { useNavigate, useLocation } from "react-router-dom";
import { useI18n } from "../../i18n";


const Navbar = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, locale, setLocale, availableLocales } = useI18n();

  const navLinks = [
    { label: t("nav.work"), href: "#work" },
    { label: t("nav.about"), href: "#about" },
  ];

  const handleScroll = (e, href) => {
    e.preventDefault();

    const scrollToId = (id) => {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    };

    // If it's a functional link (not just #)
    if (href.startsWith("#")) {
      const targetId = href.substring(1);

      if (location.pathname === "/") {
        scrollToId(targetId);
      } else {
        // If element not found (e.g. we are on a project page), go home first
        if (location.pathname !== "/") {
          navigate("/");
          // Wait for navigation then scroll
          setTimeout(() => {
            scrollToId(targetId);
          }, 300);
        }
      }
    } else {
      // External or route link
      // if it handles routing, use navigate, otherwise window.location
      window.location.href = href;
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-glass-border",
        className
      )}
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        {/* Left: Logo */}
        <a href="/" onClick={handleLogoClick} className="group">
          <span className="text-lg md:text-xl font-bold text-primary tracking-tight group-hover:text-white/80 transition-colors">
            Andrés Cruz
          </span>
        </a>

        {/* Center: Navigation */}
        <div className="hidden md:flex items-center gap-1 bg-surface/50 p-1 rounded-full border border-glass-border">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
            >
              <a
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-secondary hover:text-primary transition-colors rounded-full hover:bg-glass"
              >
                {link.label}
              </a>
            </div>
          ))}
        </div>

        {/* Right: Status & CTA */}
        {/* Right: Status & CTA - Removed per user request */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 rounded-full border border-glass-border bg-surface/50 p-1">
            {availableLocales.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLocale(code)}
                aria-pressed={locale === code}
                aria-label={t("nav.language")}
                className={cn(
                  "px-3 py-1 text-xs font-mono uppercase tracking-widest rounded-full transition-colors",
                  locale === code
                    ? "bg-white text-background"
                    : "text-secondary hover:text-primary"
                )}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
