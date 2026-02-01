import { motion } from "framer-motion";
import { useI18n } from "../../i18n";

interface ChallengeSolutionProps {
    challenge?: string;
    solution?: string;
    images?: string[];
    className?: string;
}

const ChallengeSolution = ({
    challenge,
    solution,
    images = [],
    className = "",
}: ChallengeSolutionProps) => {
    const { t } = useI18n();
    if (!challenge && !solution) return null;

    return (
        <div className={`w-full py-24 ${className}`}>
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid md:grid-cols-2 gap-12 md:gap-20">
                    {/* Left Column - Sticky Text */}
                    <div className="md:sticky md:top-32 h-fit space-y-16">
                        {challenge && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7 }}
                                className="space-y-6"
                            >
                                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary leading-tight">
                                    {t("project.challenge")}
                                </h2>
                                <p className="text-lg md:text-xl text-secondary leading-relaxed font-light max-w-xl">
                                    {challenge}
                                </p>
                            </motion.div>
                        )}

                        {solution && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="space-y-6"
                            >
                                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary leading-tight">
                                    {t("project.solution")}
                                </h2>
                                <p className="text-lg md:text-xl text-secondary leading-relaxed font-light max-w-xl">
                                    {solution}
                                </p>
                            </motion.div>
                        )}
                    </div>

                    {/* Right Column - Scrolling Images */}
                    {images.length > 0 && (
                        <div className="space-y-12">
                            {images.map((image, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: index * 0.15 }}
                                    whileHover={{ scale: 1.02 }}
                                    className="overflow-hidden rounded-2xl border border-white/5 bg-surface/30 shadow-xl"
                                >
                                    <img
                                        src={image}
                                        alt={`Challenge visual ${index + 1}`}
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChallengeSolution;
