import { motion } from "framer-motion";

interface TakeawayItem {
    label: string;
    content: string;
}

interface TakeawaysSectionProps {
    title: string;
    items: TakeawayItem[];
    className?: string;
}

const TakeawaysSection = ({
    title,
    items,
    className = "",
}: TakeawaysSectionProps) => {
    if (!items || items.length === 0) return null;

    return (
        <div className={`w-full py-20 md:py-24 ${className}`}>
            <div className="mx-auto max-w-6xl px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-6 text-left"
                >
                    {title}
                </motion.h2>

                <motion.ul
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: 0.05 }}
                    className="space-y-5"
                >
                    {items.map((item, index) => (
                        <li
                            key={`${item.label}-${index}`}
                            className="text-base md:text-lg text-secondary leading-relaxed font-light flex gap-3"
                        >
                            <span className="text-secondary/40 mt-1">•</span>
                            <span>
                                <strong className="font-semibold text-primary">{item.label}:</strong>{" "}
                                {item.content}
                            </span>
                        </li>
                    ))}
                </motion.ul>
            </div>
        </div>
    );
};

export default TakeawaysSection;
