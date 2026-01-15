import { projects } from "../data/projects";
import Badge from "./ui-2026/Badge";
import { H2, Paragraph } from "./ui-2026/Typography";

const ProjectGrid = () => {
  return (
    <section id="proyectos" className="py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
        <div className="flex flex-col gap-3 text-mist">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mist/60">
            Proyectos destacados
          </p>
          <H2>Casos reales con impacto medible</H2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-glass/2 bg-linear-100/70 shadow-glass-sm backdrop-blur-10 transition hover:-translate-y-1 hover:shadow-glass-lg"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.45),transparent_40%,rgba(0,0,0,0.55))]" />
                <div className="absolute inset-0 z-10 bg-[radial-gradient(120%_80%_at_20%_20%,rgba(255,255,255,0.08),transparent)]" />
                <img
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                />
              </div>
              <div className="flex h-full flex-col gap-4 p-6 text-mist">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <Badge className="px-2.5 py-1 text-[10px]">Study</Badge>
                </div>
                <Paragraph className="text-sm text-mist/80">
                  {project.description}
                </Paragraph>
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} className="text-[11px]">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_60%_at_80%_10%,rgba(255,255,255,0.08),transparent)]" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;
