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

    const blocksWithIndex = blocks.map((block, index) => ({ block, index }));
    const leftColumn = blocksWithIndex.filter(({ index }) => index % 2 === 0);
    const rightColumn = blocksWithIndex.filter(({ index }) => index % 2 === 1);

    const renderBlock = ({ block, index }: { block: SolutionBlock; index: number }) => (
        <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="h-fit space-y-4"
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
    );

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

                {/* Mobile: orden original */}
                <div className="flex flex-col gap-16 md:hidden">
                    {blocksWithIndex.map(renderBlock)}
                </div>

                {/* Desktop: dos columnas controladas (evita “huecos” y respeta orden por columna) */}
                <div className="hidden md:grid md:grid-cols-2 md:gap-x-20">
                    <div className="space-y-16">
                        {leftColumn.map(renderBlock)}
                    </div>
                    <div className="space-y-16">
                        {rightColumn.map(renderBlock)}
                    </div>
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
