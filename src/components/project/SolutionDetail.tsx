import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SolutionBlock {
    subtitle: string;
    content: string;
}

interface SolutionDetailProps {
    title: string;
    blocks: SolutionBlock[];
    children?: ReactNode;
    className?: string;
}

const SolutionDetail = ({
    title,
    blocks,
    children,
    className = "",
}: SolutionDetailProps) => {
    if (!blocks || blocks.length === 0) return null;

    return (
        <div className={`w-full py-20 md:py-24 ${className}`}>
            <div className="mx-auto max-w-6xl px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-6 text-left"
                >
                    {title}
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-x-20 gap-y-16">
                    {blocks.map((block, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="space-y-4"
                        >
                            <h3 className="text-lg md:text-xl font-semibold text-primary tracking-tight">
                                {block.subtitle}
                            </h3>
                            <div className="space-y-4">
                                {block.content
                                    .split("\n\n")
                                    .map((p) => p.trim())
                                    .filter(Boolean)
                                    .map((paragraph, i) => (
                                        <p
                                            key={i}
                                            className="text-base md:text-lg text-secondary leading-relaxed font-light"
                                        >
                                            {paragraph}
                                        </p>
                                    ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {children && (
                    <div className="pt-8">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SolutionDetail;
