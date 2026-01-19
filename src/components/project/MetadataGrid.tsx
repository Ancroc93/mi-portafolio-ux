import { motion } from "framer-motion";

interface MetadataItem {
    label: string;
    value: string | string[];
}

interface MetadataGridProps {
    items: MetadataItem[];
    className?: string;
}

const MetadataGrid = ({ items, className = "" }: MetadataGridProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 py-16 px-6 md:px-12 border-y border-white/10 ${className}`}
        >
            {items.map((item, index) => (
                <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col gap-3"
                >
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary/40">
                        {item.label}
                    </span>
                    <div className="text-base md:text-lg font-light text-primary">
                        {Array.isArray(item.value) ? (
                            <ul className="flex flex-col gap-1">
                                {item.value.map((v, i) => (
                                    <li key={i} className="leading-relaxed">
                                        {v}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <span className="leading-relaxed">{item.value}</span>
                        )}
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default MetadataGrid;
