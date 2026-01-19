import { AnimatePresence, motion } from "framer-motion";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Hero from "./components/sections/Hero";
import Navbar from "./components/ui/Navbar";
import Section from "./components/ui/Section";
import Footer from "./components/ui/Footer";
import ProjectList from "./components/ui/ProjectList";
import { getProjects } from "./data/projects";
import Badge from "./components/ui/Badge";
import ProjectPage from "./pages/ProjectPage";
import Cursor from "./components/ui/Cursor";
import { useI18n } from "./i18n";

const Home = () => {
  const { t, locale } = useI18n();
  const projects = getProjects(locale);


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
            <Section title={t("home.workTitle")} subtitle={t("home.workSubtitle")}>
              <p className="text-xl text-secondary/70 max-w-2xl font-light leading-relaxed">
                {t("home.workDescription")}
              </p>
            </Section>
          </div>
          <div className="mx-auto w-full max-w-6xl px-6">
            <ProjectList projects={projects} />
          </div>
        </div>

        {/* About Section */}
        <section id="about" className="py-24 border-t border-white/5">
          <div className="mx-auto w-full max-w-6xl px-6">
            <Section title={t("home.aboutTitle")} subtitle={t("home.aboutSubtitle")}>
              <div className="grid md:grid-cols-2 gap-12 mt-8">
                <div className="flex flex-col gap-6">
                  <p className="text-xl md:text-2xl text-primary font-light leading-relaxed">
                    {t("home.aboutLeadStart")}{" "}
                    <span className="text-white font-medium">
                      {t("home.aboutLeadHighlight")}
                    </span>{" "}
                    {t("home.aboutLeadEnd")}
                  </p>
                  <p className="text-lg text-secondary/70 leading-relaxed">
                    {t("home.aboutBody")}
                  </p>
                  <div className="flex gap-4 mt-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-3xl font-bold text-primary">5+</span>
                      <span className="text-xs uppercase tracking-widest text-secondary/50 font-mono">
                        {t("home.yearsLabel")}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
                      <span className="text-3xl font-bold text-primary">20+</span>
                      <span className="text-xs uppercase tracking-widest text-secondary/50 font-mono">
                        {t("home.projectsLabel")}
                      </span>
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

        <section id="contact" className="pb-32 pt-12 border-t border-white/5">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6">
            <Section title={t("home.contactTitle")} subtitle={t("home.contactSubtitle")}>
              <div className="grid gap-16 md:grid-cols-2 mt-8">
                <div className="flex flex-col gap-6">
                  <h3 className="text-3xl font-bold text-primary tracking-tight">
                    {t("home.contactHeading")}
                  </h3>
                  <p className="text-xl text-secondary/70 leading-relaxed font-light max-w-xl">
                    {t("home.contactBody")}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {t("home.contactBadges").map((label) => (
                      <Badge
                        key={label}
                        className="font-mono text-[10px] tracking-widest border-white/5 bg-white/5 uppercase"
                      >
                        {label}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4 pt-6">
                    <a
                      className="inline-flex items-center justify-center rounded-full bg-white text-background px-8 py-4 text-sm font-mono uppercase tracking-widest transition-transform hover:-translate-y-1"
                      href="mailto:hola@portafolio.com"
                    >
                      {t("home.contactCta")}
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-6 border-l border-white/5 pl-12">
                  <h3 className="text-3xl font-bold text-primary tracking-tight">
                    {t("home.statusHeading")}
                  </h3>
                  <p className="text-xl text-secondary/70 leading-relaxed font-light max-w-xl">
                    {t("home.statusBody")}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {t("home.statusBadges").map((label) => (
                      <Badge
                        key={label}
                        className="font-mono text-[10px] tracking-widest border-white/5 bg-white/5 uppercase"
                      >
                        {label}
                      </Badge>
                    ))}
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
