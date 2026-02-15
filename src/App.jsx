import { AnimatePresence, motion } from "framer-motion";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Hero from "./components/sections/Hero";
import Navbar from "./components/ui/Navbar";
import Section from "./components/ui/Section";
import Footer from "./components/ui/Footer";
import ProjectList from "./components/ui/ProjectList";
import OrganizationsMarquee from "./components/ui/OrganizationsMarquee";
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
      className="min-h-screen text-primary selection:bg-accent selection:text-background"
    >
      <Navbar />
      <main className="pt-20">
        <Hero />

        {/* Fade transition from hero aurora to solid background */}
        <div className="relative h-32 -mt-32 z-20 bg-gradient-to-b from-transparent to-background pointer-events-none" />

        <div className="relative bg-background z-10">

        {/* Work Section */}
        <section id="work" className="py-20">
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
        </section>

        {/* About Section */}
        <section id="about" className="py-20 border-t border-white/5">
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
                      <span className="text-3xl font-bold text-primary">8+</span>
                      <span className="text-xs uppercase tracking-widest text-secondary/70 font-mono">
                        {t("home.yearsLabel")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative h-full min-h-[400px] rounded-3xl overflow-hidden bg-surface/50 border border-white/5 group">
                  <img
                    src={`${import.meta.env.BASE_URL}profile.jpg`}
                    alt="Andrés Cruz"
                    className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                </div>
              </div>
              <OrganizationsMarquee />
            </Section>
          </div>
        </section>

        </div>
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
