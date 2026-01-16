import { AnimatePresence, motion } from "framer-motion";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Hero from "./components/sections/Hero";
import Navbar from "./components/ui/Navbar";
import Section from "./components/ui/Section";
import Footer from "./components/ui/Footer";
import { Paragraph, H2 } from "./components/ui/Typography";
import BentoGrid from "./components/ui/BentoGrid";
import { projects } from "./data/projects";
import Badge from "./components/ui/Badge";
import ProjectPage from "./pages/ProjectPage";
import Cursor from "./components/ui/Cursor";

const Home = () => {
  const bentoItems = projects.map((project, index) => {
    const span = index === 0 ? 6 : index === 1 ? 4 : index % 2 === 0 ? 3 : 2;
    return {
      id: project.slug || project.title,
      title: project.title,
      description: project.description,
      image: project.image,
      tag: project.tags?.[0],
      video: project.video,
      enableVideoPreview: project.enableVideoPreview,
      caseStudyUrl: project.caseStudyUrl,
      blocks: project.blocks,
      span,
      metrics: project.metrics, // Pass metrics if BentoGrid uses them
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background text-primary selection:bg-accent selection:text-background"
    >
      <Navbar />
      <main className="pt-20">
        <Hero />

        {/* Work Section (Unified) */}
        <div id="work" className="py-12">
          <div className="mx-auto w-full max-w-6xl px-6 mb-8">
            <Section title="Selected Work" subtitle="Portfolio">
              <p className="text-xl text-secondary/70 max-w-2xl font-light leading-relaxed">
                A collection of digital products, case studies, and experiments focused on user experience and interaction design.
              </p>
            </Section>
          </div>
          <div className="mx-auto w-full max-w-6xl px-6">
            <BentoGrid items={bentoItems} />
          </div>
        </div>

        {/* About Section */}
        <section id="about" className="py-24 border-t border-white/5">
          <div className="mx-auto w-full max-w-6xl px-6">
            <Section title="Beyond the pixels" subtitle="About Me">
              <div className="grid md:grid-cols-2 gap-12 mt-8">
                <div className="flex flex-col gap-6">
                  <p className="text-xl md:text-2xl text-primary font-light leading-relaxed">
                    I'm a Product Designer based in Bogotá, passionate about building digital experiences that feel <span className="text-white font-medium">cinematic</span> and intuitive.
                  </p>
                  <p className="text-lg text-secondary/70 leading-relaxed">
                    With a background in UX/UI and frontend development, I bridge the gap between design and engineering. I believe that the best products are those that not only solve problems but also evoke emotion through motion, typography, and depth.
                  </p>
                  <div className="flex gap-4 mt-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-3xl font-bold text-primary">5+</span>
                      <span className="text-xs uppercase tracking-widest text-secondary/50 font-mono">Years Exp.</span>
                    </div>
                    <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
                      <span className="text-3xl font-bold text-primary">20+</span>
                      <span className="text-xs uppercase tracking-widest text-secondary/50 font-mono">Projects</span>
                    </div>
                  </div>
                </div>
                <div className="relative h-full min-h-[300px] rounded-3xl overflow-hidden bg-surface/50 border border-white/5">
                  {/* Placeholder for About Image - could be a geometric shape or actual photo */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center">
                    <span className="text-xs font-mono uppercase tracking-widest text-white/20">Profile Image</span>
                  </div>
                </div>
              </div>
            </Section>
          </div>
        </section>

        <section id="contacto" className="pb-32 pt-12 border-t border-white/5">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6">
            <Section title="¿Listo para elevar tu producto?" subtitle="Contacto">
              <div className="grid gap-16 md:grid-cols-2 mt-8">
                <div className="flex flex-col gap-6">
                  <h3 className="text-3xl font-bold text-primary tracking-tight">Agendemos</h3>
                  <p className="text-xl text-secondary/70 leading-relaxed font-light max-w-xl">
                    Disponible para consultorías, workshops y proyectos end-to-end.
                    Hablemos de tu siguiente release.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="font-mono text-[10px] tracking-widest border-white/5 bg-white/5 uppercase">Consultoría</Badge>
                    <Badge className="font-mono text-[10px] tracking-widest border-white/5 bg-white/5 uppercase">Workshops</Badge>
                    <Badge className="font-mono text-[10px] tracking-widest border-white/5 bg-white/5 uppercase">Launch</Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 pt-6">
                    <a
                      className="inline-flex items-center justify-center rounded-full bg-white text-background px-8 py-4 text-sm font-mono uppercase tracking-widest transition-transform hover:-translate-y-1"
                      href="mailto:hola@portafolio.com"
                    >
                      Escribir correo
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-6 border-l border-white/5 pl-12">
                  <h3 className="text-3xl font-bold text-primary tracking-tight">Status rápido</h3>
                  <p className="text-xl text-secondary/70 leading-relaxed font-light max-w-xl">
                    Tiempo de respuesta típico: &lt;24h. Disponibilidad próxima semana:
                    6 slots para discovery.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge className="font-mono text-[10px] tracking-widest border-white/5 bg-white/5 uppercase">Response: 3d</Badge>
                    <Badge className="font-mono text-[10px] tracking-widest border-white/5 bg-white/5 uppercase">Motion-ready</Badge>
                    <Badge className="font-mono text-[10px] tracking-widest border-white/5 bg-white/5 uppercase">Dev handoff</Badge>
                  </div>
                </div>
              </div>
            </Section>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <>
      <Cursor />
      <AnimatedRoutes />
    </>
  );
}

export default App;
