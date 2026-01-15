import { ArrowUpRight } from "lucide-react";

const Navbar = () => {
  return (
    <header className="fixed top-0 z-50 w-full bg-white/60 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/70">
            UX Designer
          </span>
          <span className="text-sm font-semibold text-ink">Andre Cruz</span>
        </div>
        <div className="hidden items-center gap-8 text-sm text-ink/70 md:flex">
          <a className="transition hover:text-ink" href="#proyectos">
            Proyectos
          </a>
          <a className="transition hover:text-ink" href="#proceso">
            Proceso
          </a>
          <a className="transition hover:text-ink" href="#contacto">
            Contacto
          </a>
        </div>
        <a
          className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:shadow-lg"
          href="#contacto"
        >
          Hablemos
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
