import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { projects } from "../data/projects";
import LinearNavbar from "../components/ui-2026/LinearNavbar";
import Footer from "../components/ui-2026/Footer";
import { H1, H2, Paragraph } from "../components/ui-2026/Typography";
import Badge from "../components/ui-2026/Badge";
import GlassCard from "../components/ui-2026/GlassCard";

const renderBlock = (block, idx) => {
  if (block.type === "text") {
    return (
      <Paragraph key={idx} className="text-base text-mist/85 leading-relaxed">
        {block.content}
      </Paragraph>
    );
  }
  if (block.type === "list") {
    return (
      <ul key={idx} className="list-disc list-inside space-y-1 text-sm text-mist/85">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  if (block.type === "image" || block.type === "gif") {
    return (
      <div
        key={idx}
        className="overflow-hidden rounded-2xl border border-glass/2 bg-black/20"
      >
        <img
          src={block.src}
          alt={block.alt || "Media"}
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>
    );
  }
  if (block.type === "video") {
    return (
      <div
        key={idx}
        className="overflow-hidden rounded-2xl border border-glass/2 bg-black/30"
      >
        {block.embed ? (
          <iframe
            src={block.src}
            title={block.alt || "Video"}
            className="h-64 w-full"
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
    );
  }
  return null;
};

const ProjectPage = () => {
  const { slug } = useParams();
  const project = useMemo(
    () =>
      projects.find((p) => {
        const projectId = p.slug ?? p.title;
        return projectId === slug;
      }),
    [slug]
  );

  if (!project) {
    return (
      <div className="min-h-screen bg-linear-50 text-mist flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-mist/60">404</p>
          <H2 className="mt-2">Proyecto no encontrado</H2>
          <Link
            className="mt-4 inline-flex items-center justify-center rounded-full border border-glass/2 bg-white/10 px-4 py-2 text-sm font-semibold text-mist"
            to="/"
          >
            Volver
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-50 text-mist">
      <LinearNavbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto w-full max-w-6xl px-6 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              className="w-fit rounded-full border border-glass/2 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-mist hover:-translate-y-0.5 transition"
            >
              ← Volver
            </Link>
            <H1>{project.title}</H1>
            <Paragraph className="text-lg text-mist/85 max-w-3xl">
              {project.description}
            </Paragraph>
            <div className="flex flex-wrap gap-2">
              {project.tags?.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>

          {project.video && (
            <div className="overflow-hidden rounded-3xl border border-glass/2 bg-black/30">
              <video
                className="w-full h-auto"
                src={project.video}
                poster={project.image}
                controls
                playsInline
                muted
                loop
              />
            </div>
          )}

          <div className="grid gap-4">
            {project.blocks?.map((block, idx) => (
              <GlassCard key={idx} enableTilt={false}>
                {renderBlock(block, idx)}
              </GlassCard>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectPage;
