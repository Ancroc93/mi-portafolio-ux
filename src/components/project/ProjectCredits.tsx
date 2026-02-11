import { motion } from "framer-motion";

interface CreditsGroup {
    title: string;
    members: string[];
}

interface ProjectCreditsProps {
    title: string;
    subtitle?: string;
    groups: CreditsGroup[];
    className?: string;
}

const ProjectCredits = ({
    title,
    subtitle,
    groups,
    className = "",
}: ProjectCreditsProps) => {
    if (!groups || groups.length === 0) return null;

    return (
        <div className={`w-full py-20 md:py-24 ${className}`}>
            <div className="mx-auto max-w-6xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-6 md:px-6"
                >
                    <h2 className="text-lg md:text-xl font-semibold tracking-tight text-primary text-left">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="mt-2 text-sm md:text-base text-secondary/70 leading-relaxed font-light max-w-4xl">
                            {subtitle}
                        </p>
                    )}

                    <div className="mt-5 grid md:grid-cols-2 gap-x-10 gap-y-4">
                        {groups.map((group, index) => (
                            <motion.div
                                key={`${group.title}-${index}`}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.4, delay: index * 0.06 }}
                                className="text-sm md:text-base leading-relaxed"
                            >
                                <span className="font-mono uppercase tracking-widest text-secondary/50 text-[11px]">
                                    {group.title}
                                </span>
                                <p className="mt-1 text-secondary/80 font-light">
                                    {group.members.join(" · ")}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProjectCredits;
