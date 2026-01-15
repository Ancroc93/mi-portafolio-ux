import Hero from "./components/Hero";
import GlassCard from "./components/ui-2026/GlassCard";
import LinearNavbar from "./components/ui-2026/LinearNavbar";
import SpatialPanel from "./components/ui-2026/SpatialPanel";
import Footer from "./components/ui-2026/Footer";
import { Paragraph, H2 } from "./components/ui-2026/Typography";
import BentoGrid from "./components/ui-2026/BentoGrid";
import { projects } from "./data/projects";
import Badge from "./components/ui-2026/Badge";
import { Routes, Route } from "react-router-dom";
import ProjectPage from "./pages/ProjectPage";

function App() {
  const bentoItems = projects.map((project, index) => {
    // Afinación: destacar los dos primeros como hero (span 6 y 4) y luego alternar 3/2.
    const span =
      index === 0 ? 6 : index === 1 ? 4 : index % 2 === 0 ? 3 : 2;
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
    };
  });

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-linear-50 text-mist">
            <LinearNavbar />
            <main className="pt-20">
              <Hero />
              <section id="proyectos" className="py-12">
                <div className="mx-auto w-full max-w-6xl px-6">
                  <BentoGrid items={bentoItems} />
                </div>
              </section>
              <section id="proceso" className="pb-12 pt-4">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6">
                  <SpatialPanel
                    title="Metodología clara, resultados medibles"
                    subtitle="Proceso"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <GlassCard className="relative overflow-hidden">
                        <H2 className="text-2xl">Research + IA</H2>
                        <Paragraph>
                          Workshops, entrevistas y mapas de empatía respaldados por IA
                          para detectar fricción y oportunidades.
                        </Paragraph>
                        <div className="flex flex-wrap gap-2">
                          <Badge>Workshops</Badge>
                          <Badge>Insights</Badge>
                          <Badge>IA Assist</Badge>
                        </div>
                      </GlassCard>
                      <GlassCard className="relative overflow-hidden">
                        <H2 className="text-2xl">Prototipos con motion</H2>
                        <Paragraph>
                          Flujos de alto valor, handoff limpio y microinteracciones con
                          framer-motion listos para dev.
                        </Paragraph>
                        <div className="flex flex-wrap gap-2">
                          <Badge>Motion</Badge>
                          <Badge>Handoff</Badge>
                          <Badge>QA</Badge>
                        </div>
                      </GlassCard>
                    </div>
                  </SpatialPanel>
                </div>
              </section>
              <section id="contacto" className="pb-20 pt-2">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6">
                  <SpatialPanel title="¿Listo para elevar tu producto?" subtitle="Contacto">
                    <div className="grid gap-4 md:grid-cols-2">
                      <GlassCard className="h-full">
                        <H2 className="text-2xl">Agendemos</H2>
                        <Paragraph className="max-w-xl">
                          Disponible para consultorías, workshops y proyectos end-to-end.
                          Hablemos de tu siguiente release.
                        </Paragraph>
                        <div className="flex flex-wrap gap-3 pt-2">
                          <Badge>Consultoría</Badge>
                          <Badge>Workshops</Badge>
                          <Badge>Launch</Badge>
                        </div>
                        <div className="flex flex-wrap gap-3 pt-4">
                          <a
                            className="inline-flex items-center justify-center rounded-full bg-linear-300 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
                            href="mailto:hola@portafolio.com"
                          >
                            Escribir correo
                          </a>
                          <a
                            className="inline-flex items-center justify-center rounded-full border border-glass/2 bg-white/10 px-6 py-3 text-sm font-semibold text-mist transition hover:-translate-y-0.5 hover:shadow-lg"
                            href="#proyectos"
                          >
                            Ver casos
                          </a>
                        </div>
                      </GlassCard>
                      <GlassCard className="h-full">
                        <H2 className="text-2xl">Status rápido</H2>
                        <Paragraph className="max-w-xl">
                          Tiempo de respuesta típico: &lt;24h. Disponibilidad próxima semana:
                          6 slots para discovery.
                        </Paragraph>
                        <div className="flex flex-wrap gap-2 pt-3">
                          <Badge>Time-to-first-draft: 3d</Badge>
                          <Badge>Motion-ready</Badge>
                          <Badge>Dev handoff</Badge>
                        </div>
                      </GlassCard>
                    </div>
                  </SpatialPanel>
                </div>
              </section>
            </main>
            <Footer />
          </div>
        }
      />
      <Route path="/projects/:slug" element={<ProjectPage />} />
    </Routes>
  );
}

export default App;
