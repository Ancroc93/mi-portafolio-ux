import { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { getProjects } from "../data/projects";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import { H2, Paragraph } from "../components/ui/Typography";
import Badge from "../components/ui/Badge";
import { motion } from "framer-motion";
import { useI18n } from "../i18n";

// New Case Study Components
import HeroParallax from "../components/project/HeroParallax";
import MetadataGrid from "../components/project/MetadataGrid";
import ChallengeSolution from "../components/project/ChallengeSolution";
import BeforeAfterSlider from "../components/project/BeforeAfterSlider";
import BentoGallery from "../components/project/BentoGallery";
import NextProjectFooter from "../components/project/NextProjectFooter";

const emphasizeSubstring = (text, substring, className = "font-semibold") => {
  if (typeof text !== "string" || !substring) return text;
  const idx = text.indexOf(substring);
  if (idx === -1) return text;
  const before = text.slice(0, idx);
  const after = text.slice(idx + substring.length);
  return (
    <>
      {before}
      <strong className={className}>{substring}</strong>
      {after}
    </>
  );
};

const renderBlock = (block, idx) => {
  if (block.type === "text") {
    return (
      <div key={idx} className="flex flex-col gap-6 py-8 max-w-4xl">
        {block.title && <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">{block.title}</h2>}
        {block.content.split("\n\n").map((paragraph, i) => (
          <p key={i} className="text-lg md:text-xl text-secondary leading-relaxed font-light">
            {paragraph}
          </p>
        ))}
      </div>
    );
  }
  if (block.type === "list") {
    return (
      <div key={idx} className="py-6 max-w-4xl">
        <ul className="list-disc list-inside space-y-3 text-lg text-secondary font-light">
          {block.items.map((item) => (
            <li key={item} className="pl-2">{item}</li>
          ))}
        </ul>
      </div>
    );
  }
  if (block.type === "image" || block.type === "gif") {
    return (
      <div key={idx} className="py-8 w-full">
        <div className="overflow-hidden rounded-3xl border border-white/5 bg-surface/30 shadow-2xl">
          <img
            src={block.src}
            alt={block.alt || "Media"}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
      </div>
    );
  }
  if (block.type === "video") {
    return (
      <div key={idx} className="py-8 w-full">
        <div className="overflow-hidden rounded-3xl border border-white/5 bg-surface/30 shadow-2xl">
          {block.embed ? (
            <iframe
              src={block.src}
              title={block.alt || "Video"}
              className="h-[500px] w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <video
              className="w-full h-auto"
              src={block.src}
              poster={block.poster}
              controls
              playsInline
              muted
              loop
            />
          )}
        </div>
      </div>
    );
  }
  return null;
};

const ProjectPage = () => {
  const { slug } = useParams();
  const { t, locale } = useI18n();
  const projects = useMemo(() => getProjects(locale), [locale]);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug]);
  const project = useMemo(
    () =>
      projects.find((p) => {
        const projectId = p.slug ?? p.title;
        return projectId === slug;
      }),
    [slug, projects]
  );

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-primary flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-secondary font-mono">404</p>
          <H2 className="mt-2 text-primary">{t("project.notFound")}</H2>
          <Link
            className="mt-6 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-2 text-sm font-mono text-primary hover:bg-white/10 transition-colors"
            to="/"
          >
            {t("project.goHome")}
          </Link>
        </div>
      </div>
    );
  }

  // Check if this is an advanced case study
  const hasCaseStudy = !!project.caseStudy;
  const nextProject = project.caseStudy?.nextProjectSlug
    ? projects.find((p) => p.slug === project.caseStudy.nextProjectSlug)
    : null;

  // For advanced case studies, render the new template
  if (hasCaseStudy) {
    const heroSubtitle =
      project.slug === "registro-personas-juridicas"
        ? (locale === "es"
          ? emphasizeSubstring(
            project.description,
            "llevando la tasa de completitud del 46.87% al 62.37% y la conversión a compliance del 39.72% al 50.20%.",
            "font-semibold"
          )
          : emphasizeSubstring(
            project.description,
            "improving completion rate from 46.87% to 62.37% and compliance conversion from 39.72% to 50.20%.",
            "font-semibold"
          ))
        : project.description;
    const solutionComment =
      project.slug === "registro-personas-juridicas"
        ? (locale === "es"
          ? "Creíamos que el problema era un flujo largo. Los datos mostraron que el problema era un flujo confuso."
          : "We thought the problem was a long flow. Data showed the real problem was a confusing flow.")
        : undefined;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-background text-primary selection:bg-accent selection:text-background relative"
        style={{
          "--project-accent-color": project.caseStudy?.accentColor || "#ffffff",
        }}
      >
        {/* Cinematic Background */}
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)] pointer-events-none" />

        <Navbar />

        <main>
          {/* Hero Parallax Section */}
          <HeroParallax
            title={project.title}
            subtitle={heroSubtitle}
            backgroundImage={project.caseStudy?.heroImage || project.image}
            backgroundVideo={project.caseStudy?.heroVideo}
            accentColor={project.caseStudy?.accentColor}
          />

          {/* Metadata Grid */}
          <div className="mx-auto max-w-7xl">
            <MetadataGrid
              items={[
                {
                  label: t("project.role"),
                  value: Array.isArray(project.role)
                    ? project.role
                    : [project.role],
                },
                { label: t("project.year"), value: project.year },
                ...(project.metrics || []),
              ]}
            />
          </div>

          {/* Challenge & Solution */}
          {(project.caseStudy?.challenge || project.caseStudy?.solution) && (
            <ChallengeSolution
              challenge={project.caseStudy.challenge}
              solution={project.caseStudy.solution}
              solutionComment={solutionComment}
              images={project.caseStudy.challengeImages}
              accentColor={project.caseStudy.accentColor}
            />
          )}

          {/* Before/After Slider */}
          <BeforeAfterSlider
            beforeImage={project.caseStudy.beforeImage}
            afterImage={project.caseStudy.afterImage}
            beforeLabel={project.caseStudy.comparisonLabel?.before || t("project.before")}
            afterLabel={project.caseStudy.comparisonLabel?.after || t("project.after")}
          />

          {/* Bento Gallery */}
          {project.caseStudy?.galleryImages && (
            <BentoGallery images={project.caseStudy.galleryImages} />
          )}

          {/* Content Blocks (if any) */}
          {project.blocks && project.blocks.length > 0 && (
            <div className="mx-auto max-w-5xl px-6 py-16">
              <div className="flex flex-col gap-8">
                {project.blocks.map((block, idx) => renderBlock(block, idx))}
              </div>
            </div>
          )}

          {/* Next Project Footer */}
          {nextProject && (
            <NextProjectFooter
              nextProjectSlug={nextProject.slug}
              nextProjectTitle={nextProject.title}
              nextProjectImage={nextProject.image}
            />
          )}
        </main>

        <Footer />
      </motion.div>
    );
  }

  // Original template for non-case-study projects
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-background text-primary selection:bg-accent selection:text-background relative"
    >
      {/* Cinematic Background */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)] pointer-events-none" />

      <Navbar />

      <main className="pt-32 pb-24">
        <div className="mx-auto w-full max-w-5xl px-6 flex flex-col gap-16">

          {/* Header Section */}
          <div className="flex flex-col gap-8">
            <Link
              to="/"
              className="w-fit pl-1 text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 hover:text-primary transition-colors"
            >
              {t("project.back")}
            </Link>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-bold tracking-tighter text-primary leading-[0.9]"
            >
              {project.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="flex flex-wrap gap-x-12 gap-y-6 pt-6 border-t border-white/10"
            >
              <div>
                <span className="block text-secondary/40 text-[10px] uppercase tracking-widest mb-2 font-mono">
                  {t("project.role")}
                </span>
                <span className="text-primary font-mono text-sm tracking-wide">{Array.isArray(project.role) ? project.role.join(", ") : project.role}</span>
              </div>
              <div>
                <span className="block text-secondary/40 text-[10px] uppercase tracking-widest mb-2 font-mono">
                  {t("project.year")}
                </span>
                <span className="text-primary font-mono text-sm tracking-wide">{project.year}</span>
              </div>
              {project.metrics && project.metrics.map((metric, i) => (
                <div key={i}>
                  <span className="block text-secondary/40 text-[10px] uppercase tracking-widest mb-2 font-mono">{metric.label}</span>
                  <span className="text-accent font-mono text-sm tracking-wide">{metric.value}</span>
                </div>
              ))}
            </motion.div>

            <div className="flex flex-wrap gap-3 mt-4">
              {project.tags?.map((tag) => (
                <Badge key={tag} className="border-white/10 bg-white/5 text-secondary/80 font-mono text-xs backdrop-blur-md px-3 py-1">{tag}</Badge>
              ))}
            </div>

            <Paragraph className="text-xl md:text-2xl text-secondary leading-relaxed max-w-3xl mt-4 font-light">
              {project.description}
            </Paragraph>
          </div>

          {/* Hero Video/Image */}
          {project.video && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="overflow-hidden rounded-3xl border border-white/5 bg-surface/30 shadow-2xl"
            >
              <video
                className="w-full h-auto"
                src={project.video}
                poster={project.image}
                controls
                playsInline
                muted
                loop
              />
            </motion.div>
          )}

          {/* Content Blocks - Seamless Flow */}
          <div className="flex flex-col gap-8">
            {project.blocks?.map((block, idx) => renderBlock(block, idx))}
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default ProjectPage;
