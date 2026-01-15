import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "./cn";

const links = [
  { label: "Proyectos", href: "#proyectos" },
  { label: "Proceso", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
];

const LinearNavbar = ({ className }) => {
  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full bg-linear-50/70 backdrop-blur-10 border-b border-glass/1",
        "supports-[backdrop-filter]:bg-linear-50/40",
        className
      )}
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 text-mist">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-glass/2 bg-white/5">
            <Sparkles className="h-4 w-4 text-mist/80" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs uppercase tracking-[0.35em] text-mist/60">
              UI 2026
            </span>
            <span className="text-sm font-semibold">Linear Spatial Kit</span>
          </div>
        </div>
        <div className="hidden items-center gap-6 text-sm text-mist/80 md:flex">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1 transition hover:text-white hover:bg-white/5"
            >
              {item.label}
            </a>
          ))}
        </div>
        <motion.a
          whileHover={{ scale: 1.03, y: -2 }}
          href="#contacto"
          className="inline-flex items-center gap-2 rounded-full border border-glass/2 bg-linear-200/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white shadow-glass-sm"
        >
          Hablemos
          <ArrowUpRight className="h-4 w-4" />
        </motion.a>
      </nav>
    </header>
  );
};

export default LinearNavbar;
