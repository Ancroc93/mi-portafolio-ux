import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "../../i18n";

/**
 * Tabla de archivo para proyectos secundarios.
 * Inspirado en sananes.co
 */
const ProjectArchive = ({ projects }) => {
    const { t } = useI18n();
    return (
        <div className="w-full">
            <h2 className="text-sm font-mono text-secondary uppercase tracking-widest mb-8">
                {t("archive.title")}
            </h2>

            <div className="flex flex-col">
                {/* Header - Hidden on mobile, shown on md+ */}
                <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-glass-border text-xs font-mono text-secondary/50 uppercase tracking-wider">
                    <div className="col-span-1">{t("archive.year")}</div>
                    <div className="col-span-4">{t("archive.project")}</div>
                    <div className="col-span-3">{t("archive.role")}</div>
                    <div className="col-span-3">{t("archive.tags")}</div>
                    <div className="col-span-1 text-right">{t("archive.link")}</div>
                </div>

                {/* Rows */}
                {projects.map((project, i) => (
                    <motion.div
                        key={project.slug || i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="group relative md:grid md:grid-cols-12 md:gap-4 py-4 md:py-6 border-b border-glass-border/50 items-center hover:bg-glass/50 transition-colors rounded-lg md:rounded-none px-2 md:px-0"
                    >
                        {/* Year */}
                        <div className="col-span-1 text-xs font-mono text-secondary group-hover:text-primary transition-colors mb-1 md:mb-0">
                            {project.year || "—"}
                        </div>

                        {/* Project Title (Visible Link) */}
                        <div className="col-span-4 font-semibold text-base text-primary mb-1 md:mb-0">
                            {project.title}
                        </div>

                        {/* Role */}
                        <div className="col-span-3 text-sm text-secondary/80 hidden md:block">
                            {project.role || "—"}
                        </div>

                        {/* Tags */}
                        <div className="col-span-3 flex flex-wrap gap-2 text-xs">
                            {project.tags?.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full border border-glass-border bg-surface/50 px-2 py-0.5 text-secondary"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Link Icon */}
                        <div className="col-span-1 text-right pt-2 md:pt-0">
                            <a href="#" className="inline-flex items-center gap-1 text-xs font-bold text-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                {t("archive.view")} <ArrowUpRight className="h-3 w-3" />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProjectArchive;
