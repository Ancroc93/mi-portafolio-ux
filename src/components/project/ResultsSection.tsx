import { motion } from "framer-motion";
import type { ReactNode } from "react";

type ResultRow = {
    metric: string;
    before: string;
    after: string;
    delta: string;
};

type ResultBullet = {
    label: string;
    content: string;
    highlights?: string[];
};

interface ResultsSectionProps {
    title: string;
    rows: ResultRow[];
    headers?: {
        metric: string;
        before: string;
        after: string;
        delta: string;
    };
    evolutionTitle: string;
    introLead: string;
    introStrong: string;
    introTail: string;
    bullets: ResultBullet[];
    children?: ReactNode;
    className?: string;
}

const emphasizeSegments = (text: string, segments?: string[]) => {
    if (!segments || segments.length === 0) return text;

    let parts: (string | JSX.Element)[] = [text];
    segments.forEach((segment, idx) => {
        const nextParts: (string | JSX.Element)[] = [];
        parts.forEach((part) => {
            if (typeof part !== "string" || !part.includes(segment)) {
                nextParts.push(part);
                return;
            }
            const [before, after] = part.split(segment);
            if (before) nextParts.push(before);
            nextParts.push(
                <strong key={`${segment}-${idx}`} className="font-semibold text-primary">
                    {segment}
                </strong>
            );
            if (after) nextParts.push(after);
        });
        parts = nextParts;
    });

    return parts;
};

const ResultsSection = ({
    title,
    rows,
    headers,
    evolutionTitle,
    introLead,
    introStrong,
    introTail,
    bullets,
    children,
    className = "",
}: ResultsSectionProps) => {
    // Determine which columns to show (hide columns where header is empty)
    const showBefore = !!(headers?.before);
    const showDelta = !!(headers?.delta);

    return (
        <div className={`w-full py-20 md:py-24 ${className}`}>
            <div className="mx-auto max-w-6xl px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-6"
                >
                    {title}
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.65 }}
                    className="overflow-x-auto rounded-2xl border border-white/10 bg-surface/30 shadow-xl mb-10"
                >
                    <table className="w-full min-w-[520px] md:min-w-[640px] text-left">
                        <thead className="bg-white/[0.03]">
                            <tr className="border-b border-white/10">
                                <th className="px-3 py-3 md:px-6 md:py-4 text-xs sm:text-sm md:text-2xl font-semibold text-primary whitespace-nowrap">
                                    {headers?.metric ?? "Métrica"}
                                </th>
                                {showBefore && (
                                    <th className="px-3 py-3 md:px-5 md:py-4 text-xs sm:text-sm md:text-2xl font-semibold text-primary whitespace-nowrap">
                                        {headers?.before}
                                    </th>
                                )}
                                <th className="px-3 py-3 md:px-5 md:py-4 text-xs sm:text-sm md:text-2xl font-semibold text-primary whitespace-nowrap">
                                    {headers?.after ?? "Después"}
                                </th>
                                {showDelta && (
                                    <th className="px-3 py-3 md:px-5 md:py-4 text-xs sm:text-sm md:text-2xl font-semibold text-primary whitespace-nowrap">
                                        {headers?.delta}
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr
                                    key={`${row.metric}-${index}`}
                                    className="border-b border-white/10 last:border-b-0"
                                >
                                    <td className="px-3 py-4 md:px-6 md:py-5 text-sm sm:text-base md:text-2xl font-semibold text-primary">
                                        {row.metric}
                                    </td>
                                    {showBefore && (
                                        <td className="px-3 py-4 md:px-5 md:py-5 text-sm sm:text-base md:text-2xl text-secondary whitespace-nowrap">
                                            {row.before}
                                        </td>
                                    )}
                                    <td className="px-3 py-4 md:px-5 md:py-5 text-sm sm:text-base md:text-2xl text-secondary">
                                        {row.after}
                                    </td>
                                    {showDelta && (
                                        <td className="px-3 py-4 md:px-5 md:py-5 text-sm sm:text-base md:text-2xl font-semibold text-primary whitespace-nowrap">
                                            {row.delta}
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.65, delay: 0.05 }}
                    className="space-y-6"
                >
                    <h3 className="text-lg md:text-xl font-semibold tracking-tight text-primary">
                        {evolutionTitle}
                    </h3>

                    <p className="text-base md:text-lg text-secondary leading-relaxed font-light max-w-5xl">
                        {introLead}{" "}
                        <strong className="font-semibold text-primary">{introStrong}</strong>
                        {introTail}
                    </p>

                    <ul className="space-y-5">
                        {bullets.map((bullet, idx) => (
                            <li
                                key={`${bullet.label}-${idx}`}
                                className="text-base md:text-lg text-secondary leading-relaxed font-light flex gap-3"
                            >
                                <span className="text-secondary/40 mt-1">•</span>
                                <span>
                                    <strong className="font-semibold text-primary">{bullet.label}:</strong>{" "}
                                    {emphasizeSegments(bullet.content, bullet.highlights)}
                                </span>
                            </li>
                        ))}
                    </ul>

                    {children && (
                        <div className="pt-8">
                            {children}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default ResultsSection;
