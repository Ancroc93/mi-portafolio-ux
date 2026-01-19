import { motion } from "framer-motion";

interface BentoGalleryProps {
    images: string[];
    className?: string;
}

const BentoGallery = ({ images, className = "" }: BentoGalleryProps) => {
    if (!images || images.length === 0) return null;

    // Define asymmetric grid patterns based on number of images
    const getGridClass = (index: number, total: number) => {
        // Pattern for different image counts
        if (total === 1) return "col-span-2 row-span-2";
        if (total === 2) return index === 0 ? "col-span-2" : "col-span-2";
        if (total === 3 || total === 4) {
            if (index === 0) return "md:col-span-2 md:row-span-2";
            return "md:col-span-1";
        }
        // For 5+ images: varied pattern
        if (index === 0) return "md:col-span-2 md:row-span-2";
        if (index === 1 || index === 2) return "md:col-span-1";
        if (index === 3) return "md:col-span-2";
        return "md:col-span-1";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className={`w-full py-24 ${className}`}
        >
            <div className="mx-auto max-w-7xl px-6">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-12">
                    Final Designs
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] gap-4">
                    {images.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-surface/30 shadow-xl ${getGridClass(
                                index,
                                images.length
                            )}`}
                        >
                            <img
                                src={image}
                                alt={`Design ${index + 1}`}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />
                            {/* Subtle overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default BentoGallery;
