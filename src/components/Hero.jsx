import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { Sparkles } from "lucide-react";
import { H1, Paragraph } from "./ui-2026/Typography";

const Hero = () => {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 200, damping: 50 });
  const skew = useTransform(smooth, [-2500, 0, 2500], [6, 0, -6]);

  return (
    <section className="relative overflow-hidden pb-16 pt-32 text-mist">
      <div className="absolute inset-0 -z-10 bg-linear-radial" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_55%)]" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-glass/2 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-mist/80 backdrop-blur-10">
          <Sparkles className="h-4 w-4" />
          Experiencias digitales premium
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <motion.div style={{ skewY: skew }} className="origin-left">
            <H1>
              Diseño experiencias que transforman productos en
              <span className="text-mist/60"> marcas memorables.</span>
            </H1>
          </motion.div>
          <Paragraph className="max-w-2xl">
            Soy UX Designer especializado en investigación, estrategia y
            sistemas visuales. Creo interfaces elegantes que equilibran negocio,
            emoción y claridad.
          </Paragraph>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              className="inline-flex items-center justify-center rounded-full bg-linear-300 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
              href="#proyectos"
            >
              Ver proyectos
            </a>
            <a
              className="inline-flex items-center justify-center rounded-full border border-glass/2 bg-white/10 px-6 py-3 text-sm font-semibold text-mist transition hover:-translate-y-0.5 hover:shadow-lg"
              href="#contacto"
            >
              Agenda una llamada
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
