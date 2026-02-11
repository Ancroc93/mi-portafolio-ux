import { motion } from "framer-motion";
import { useI18n } from "../../i18n";
import VideoShowcase from "./VideoShowcase";

interface ChallengeSolutionProps {
    challenge?: string;
    solution?: string;
    solutionComment?: string;
    images?: string[];
    accentColor?: string;
    className?: string;
}

const ChallengeSolution = ({
    challenge,
    solution,
    solutionComment,
    images = [],
    accentColor,
    className = "",
}: ChallengeSolutionProps) => {
    const { t } = useI18n();
    if (!challenge && !solution) return null;

    const emphasisSentences = [
        "Se iban porque no entendían qué se les pedía ni por qué.",
        "They were leaving because they did not understand what was being asked of them or why.",
    ];
    const highlightSentence = (paragraph: string) => {
        for (const sentence of emphasisSentences) {
            if (!paragraph.includes(sentence)) continue;
            const [before, after] = paragraph.split(sentence);
            return (
                <>
                    {before}
                    <strong className="font-semibold text-primary/95">{sentence}</strong>
                    {after}
                </>
            );
        }
        return paragraph;
    };

    const renderParagraphs = (text: string) =>
        text
            .split("\n\n")
            .map((paragraph) => paragraph.trim())
            .filter(Boolean)
            .map((paragraph, index) => (
                <p
                    key={`${paragraph.slice(0, 24)}-${index}`}
                    className="text-lg md:text-xl text-secondary leading-relaxed font-light"
                >
                    {highlightSentence(paragraph)}
                </p>
            ));

    const isVideoSrc = (src: string) => /\.(mp4|m4v|webm|mov)$/i.test(src);
    const videoMimeType = (src: string) => {
        if (/\.webm$/i.test(src)) return "video/webm";
        if (/\.mov$/i.test(src)) return "video/quicktime";
        return "video/mp4";
    };

    return (
        <div className={`w-full py-20 md:py-24 ${className}`}>
            <div className="mx-auto max-w-6xl px-6">
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
                                <div className="max-w-xl space-y-5">
                                    {renderParagraphs(challenge)}
                                </div>
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
                                {solutionComment ? (
                                    <p className="text-sm md:text-base text-secondary/70 font-light italic max-w-xl">
                                        {solutionComment}
                                    </p>
                                ) : (
                                    <div className="h-6" aria-hidden />
                                )}
                                <div className="max-w-xl space-y-5">
                                    {renderParagraphs(solution)}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Right Column - Scrolling Media */}
                    {images.length > 0 && (
                        <div className="space-y-12">
                            {images.map((image, index) =>
                                isVideoSrc(image) ? (
                                    <VideoShowcase
                                        key={index}
                                        src={image}
                                        mimeType={videoMimeType(image)}
                                        accentColor={accentColor}
                                    />
                                ) : (
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
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChallengeSolution;
