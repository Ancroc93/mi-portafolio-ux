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

    const renderParagraphs = (text: string) => {
        if (!text || typeof text !== "string") return [];
        const blocks = text
            .split(/\r?\n\r?\n/)
            .map((p) => p.trim())
            .filter(Boolean);

        const result: React.ReactNode[] = [];
        let i = 0;
        let listCounter = 0;

        while (i < blocks.length) {
            if (!blocks[i]) { i++; continue; }

            // Group consecutive blocks starting with — into a <ul>
            if (blocks[i].startsWith("—")) {
                const listItems: string[] = [];
                while (i < blocks.length && blocks[i]?.startsWith("—")) {
                    listItems.push(blocks[i].replace(/^—\s*/, ""));
                    i++;
                }
                result.push(
                    <ul
                        key={`list-${listCounter++}`}
                        className="space-y-3 pl-1"
                    >
                        {listItems.map((item, li) => (
                            <li
                                key={`li-${li}`}
                                className="flex items-start gap-3 text-lg md:text-xl text-secondary leading-relaxed font-light"
                            >
                                <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-secondary/30 shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>,
                );
            } else {
                result.push(
                    <p
                        key={`para-${i}`}
                        className="text-lg md:text-xl text-secondary leading-relaxed font-light"
                    >
                        {highlightSentence(blocks[i])}
                    </p>,
                );
                i++;
            }
        }

        return result;
    };

    const isVideoSrc = (src: string) => /\.(mp4|m4v|webm|mov)$/i.test(src);
    const videoMimeType = (src: string) => {
        if (/\.webm$/i.test(src)) return "video/webm";
        if (/\.mov$/i.test(src)) return "video/quicktime";
        return "video/mp4";
    };

    return (
        <div className={`w-full py-20 md:py-24 ${className}`}>
            <div className="mx-auto max-w-6xl px-6">
                <div className={`grid gap-12 md:gap-20 ${images.length > 0 ? "md:grid-cols-2" : ""}`}>
                    {/* Left Column - Sticky Text */}
                    <div className={`h-fit space-y-16 ${images.length > 0 ? "md:sticky md:top-32" : ""}`}>
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
                                <div className="space-y-5">
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
                                    <p className="text-sm md:text-base text-secondary/70 font-light italic">
                                        {solutionComment}
                                    </p>
                                ) : (
                                    <div className="h-6" aria-hidden />
                                )}
                                <div className="space-y-5">
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
