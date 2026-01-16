import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronDown } from "lucide-react";
import { cn } from "./cn";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contacto" },
];



const Navbar = ({ className }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        {/* Left: Logo */}
        <a href="/" onClick={handleLogoClick} className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-glass-border bg-surface group-hover:bg-surface/80 transition-colors">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-mono uppercase tracking-widest text-secondary">
              Portfolio
            </span>
            <span className="text-sm font-bold text-primary tracking-tight">
              Andrés Cruz
            </span>
          </div>
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
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
