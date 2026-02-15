import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "./cn";
import { ArrowUpRight } from "lucide-react";
import { Project } from "../../types";
import { useI18n } from "../../i18n";

type ProjectListProps = {
    projects: Project[];
    className?: string;
};

const ProjectList = ({ projects, className }: ProjectListProps) => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const featuredVideoRef = useRef<HTMLVideoElement | null>(null);
    const { t } = useI18n();

    return (
        <div className={cn("flex flex-col w-full py-16 gap-[1px]", className)}>
            {projects.map((project) => {
                const previewVideo =
                    project.slug === "construyendo-democracia"
                        ? project.caseStudy?.heroVideo
                        : project.video && project.enableVideoPreview
                            ? project.video
                            : undefined;

                return (
                <Link
                    key={project.slug}
                    to={`/projects/${project.slug}`}
                    className="group relative flex w-full flex-col md:flex-row md:items-center justify-between py-16 px-8 overflow-hidden transition-all"
                    onMouseEnter={() => {
                        setHoveredId(project.slug);
                        if (project.slug === "construyendo-democracia" && featuredVideoRef.current) {
                            void featuredVideoRef.current.play().catch(() => undefined);
                        }
                    }}
                    onMouseLeave={() => {
                        setHoveredId(null);
                        if (project.slug === "construyendo-democracia" && featuredVideoRef.current) {
                            featuredVideoRef.current.pause();
                            featuredVideoRef.current.currentTime = 0;
                        }
                    }}
                >
                    {/* Background Image/Video (Full Width) */}
                    <div className="absolute inset-0 z-0">
                        {project.slug === "construyendo-democracia" && previewVideo ? (
                            <video
                                ref={featuredVideoRef}
                                src={previewVideo}
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                className={cn(
                                    "absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out",
                                    hoveredId === project.slug
                                        ? "opacity-100 grayscale-0 scale-105"
                                        : "opacity-40 grayscale"
                                )}
                            />
                        ) : (
                            <>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className={cn(
                                        "h-full w-full object-cover transition-all duration-700 ease-out",
                                        "grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                                    )}
                                />
                                {previewVideo && hoveredId === project.slug && (
                                    <video
                                        src={previewVideo}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                    />
                                )}
                            </>
                        )}
                        {/* Gradient Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-[1]" />
                    </div>

                    {/* Content (Overlaid on Image) */}
                    <div className="relative z-10 flex flex-col gap-2 md:w-2/3">
                        <h3 className="text-4xl md:text-6xl font-light tracking-tight text-white transition-transform duration-500 group-hover:translate-x-2">
                            {project.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-white/80">
                            <span className="font-mono uppercase tracking-widest">
                                {Array.isArray(project.role) ? project.role[0] : project.role}
                            </span>
                            <span className="h-1 w-1 rounded-full bg-white/40" />
                            <span className="font-mono">{project.year}</span>
                            {project.location && (
                                <>
                                    <span className="h-1 w-1 rounded-full bg-white/40" />
                                    <span className="font-mono">{project.location}</span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* CTA (Overlaid on Image) */}
                    <div className="relative z-10 mt-6 md:mt-0 flex justify-end md:w-1/3">
                        <div className="flex items-center gap-2 rounded-full border border-white/30 bg-black/20 backdrop-blur-md px-6 py-3 text-white transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white">
                            <span className="text-sm font-mono uppercase tracking-widest">
                                {t("home.viewCase")}
                            </span>
                            <ArrowUpRight className="h-4 w-4" />
                        </div>
                    </div>
                </Link>
            )})}
        </div>
    );
};

export default ProjectList;
