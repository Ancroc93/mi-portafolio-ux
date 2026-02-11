import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface NextProjectFooterProps {
    nextProjectSlug: string;
    nextProjectTitle: string;
    nextProjectImage?: string;
    className?: string;
}

const NextProjectFooter = ({
    nextProjectSlug,
    nextProjectTitle,
    nextProjectImage,
    className = "",
}: NextProjectFooterProps) => {
    return (
        <Link to={`/projects/${nextProjectSlug}`} className="block">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`relative h-[50vh] md:h-[60vh] overflow-hidden group cursor-pointer ${className}`}
            >
                {/* Background Image */}
                <div className="absolute inset-0">
                    {nextProjectImage && (
                        <motion.img
                            src={nextProjectImage}
                            alt={nextProjectTitle}
                            className="h-full w-full object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                        />
                    )}
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-start justify-center text-left px-6 md:px-12">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-xs font-mono uppercase tracking-[0.3em] text-white/60 mb-6"
                    >
                        Next Project
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.7 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 max-w-4xl"
                    >
                        {nextProjectTitle}
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="flex items-center gap-3 text-white/90 group-hover:text-white transition-colors"
                    >
                        <span className="text-sm font-mono uppercase tracking-widest">
                            View Case Study
                        </span>
                        <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <ArrowRight className="h-5 w-5" />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Hover effect: expand to full screen feel */}
                <motion.div
                    className="absolute inset-0 border-4 border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none"
                    whileHover={{ scale: 1.02 }}
                />
            </motion.div>
        </Link>
    );
};

export default NextProjectFooter;
