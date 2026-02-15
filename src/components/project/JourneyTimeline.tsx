import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "../../i18n";

export interface JourneyStep {
    title: string;
    image?: string;
    emotionalState: string;
    emotionalColor?: string;
    keyObjects: string[];
    insights: string;
}

interface JourneyTimelineProps {
    steps: JourneyStep[];
    accentColor?: string;
    className?: string;
}

const slideVariants = {
    enter: (dir: number) => ({
        x: dir > 0 ? 120 : -120,
        opacity: 0,
        scale: 0.96,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
    },
    exit: (dir: number) => ({
        x: dir > 0 ? -120 : 120,
        opacity: 0,
        scale: 0.96,
    }),
};

const JourneyTimeline = ({
    steps,
    accentColor = "#3B8A5A",
    className = "",
}: JourneyTimelineProps) => {
    const { t } = useI18n();
    const [activeStep, setActiveStep] = useState(0);
    const [direction, setDirection] = useState(0);

    const goTo = useCallback(
        (index: number) => {
            if (index === activeStep || index < 0 || index >= steps.length) return;
            setDirection(index > activeStep ? 1 : -1);
            setActiveStep(index);
        },
        [activeStep, steps.length]
    );

    const next = useCallback(
        () => goTo(Math.min(activeStep + 1, steps.length - 1)),
        [activeStep, goTo, steps.length]
    );
    const prev = useCallback(
        () => goTo(Math.max(activeStep - 1, 0)),
        [activeStep, goTo]
    );

    // Keyboard navigation
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [next, prev]);

    const step = steps[activeStep];
    const progress = ((activeStep) / (steps.length - 1)) * 100;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className={`relative pt-16 ${className}`}
        >
            {/* ── Section title ── */}
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-primary mb-12 text-center">
                {t("project.journeyTitle")}
            </h3>

            {/* ── Step indicator bar ── */}
            <div className="relative mb-10 px-2">
                {/* Track */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-white/[0.08] -translate-y-1/2" />
                {/* Progress fill */}
                <motion.div
                    className="absolute top-1/2 left-0 h-px -translate-y-1/2 origin-left"
                    style={{ backgroundColor: accentColor }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                />

                {/* Dots */}
                <div className="relative flex items-center justify-between">
                    {steps.map((s, i) => {
                        const isActive = i === activeStep;
                        const isPast = i < activeStep;
                        return (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                className="relative z-10 group flex flex-col items-center cursor-pointer"
                                aria-label={`Step ${i + 1}: ${s.title}`}
                            >
                                <motion.div
                                    className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border-2 transition-colors duration-300"
                                    style={{
                                        borderColor: isActive || isPast ? accentColor : "rgba(255,255,255,0.15)",
                                        backgroundColor: isActive
                                            ? accentColor
                                            : isPast
                                                ? `${accentColor}80`
                                                : "transparent",
                                    }}
                                    animate={isActive ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                                    transition={
                                        isActive
                                            ? { duration: 0.4, ease: "easeOut" }
                                            : { duration: 0.2 }
                                    }
                                />
                                {/* Tooltip on hover (desktop) */}
                                <span className="absolute top-6 hidden md:group-hover:block text-[10px] font-mono text-secondary/60 whitespace-nowrap bg-background/90 backdrop-blur-sm px-2 py-1 rounded border border-white/[0.06]">
                                    {s.title}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ── Main card area — everything overlaid on image ── */}
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/[0.08]">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={activeStep}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                        className="relative aspect-[16/10] md:aspect-[2.2/1]"
                    >
                        {/* Background image */}
                        {step.image ? (
                            <motion.img
                                key={`img-${activeStep}`}
                                src={step.image}
                                alt={step.title}
                                className="absolute inset-0 w-full h-full object-cover"
                                initial={{ scale: 1.08 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                loading="lazy"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-surface/30" />
                        )}

                        {/* Dark overlay + blur for legibility */}
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

                        {/* All content overlaid */}
                        <div className="relative z-10 h-full flex flex-col justify-between p-5 md:p-8">
                            {/* Top row: step counter + title + emotion */}
                            <div className="flex items-start gap-4">
                                <span className="text-3xl md:text-4xl font-bold font-mono leading-none text-white/50 mt-0.5">
                                    {String(activeStep + 1).padStart(2, "0")}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-lg md:text-2xl font-bold text-white tracking-tight leading-tight">
                                        {step.title}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-2.5">
                                        <span
                                            className="w-0.5 h-4 rounded-full flex-shrink-0"
                                            style={{
                                                backgroundColor:
                                                    step.emotionalColor || accentColor,
                                            }}
                                        />
                                        <span className="text-xs uppercase tracking-[0.15em] font-mono text-white/50">
                                            {step.emotionalState}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom area: objects + insights */}
                            <div className="space-y-4">
                                {/* Key Objects */}
                                {step.keyObjects.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.15 }}
                                    >
                                        <span className="text-[10px] uppercase tracking-[0.25em] text-white/50 font-mono">
                                            {t("project.journeyObjects")}
                                        </span>
                                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                                            {step.keyObjects.map((obj, i) => (
                                                <motion.span
                                                    key={obj}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{
                                                        duration: 0.3,
                                                        delay: 0.2 + i * 0.04,
                                                    }}
                                                    className="px-2.5 py-1 rounded-full text-[11px] font-mono border border-white/[0.12] bg-black/40 text-white/80 backdrop-blur-md"
                                                >
                                                    {obj}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Insights */}
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.25 }}
                                >
                                    <span className="text-[10px] uppercase tracking-[0.25em] text-white/50 font-mono">
                                        {t("project.journeyInsights")}
                                    </span>
                                    <p className="mt-1 text-sm md:text-[15px] text-white/75 leading-relaxed font-light whitespace-pre-line">
                                        {step.insights}
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* ── Navigation arrows ── */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-2 md:px-4 z-20">
                    <button
                        onClick={prev}
                        disabled={activeStep === 0}
                        className="pointer-events-auto w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/[0.1] flex items-center justify-center text-white/70 hover:text-white hover:border-white/25 transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
                        aria-label="Previous step"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={next}
                        disabled={activeStep === steps.length - 1}
                        className="pointer-events-auto w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/[0.1] flex items-center justify-center text-white/70 hover:text-white hover:border-white/25 transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
                        aria-label="Next step"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {/* ── Bottom counter ── */}
            <div className="flex items-center justify-center gap-3 mt-6">
                <span className="text-xs font-mono text-secondary/40">
                    {String(activeStep + 1).padStart(2, "0")}
                    <span className="mx-1.5 text-secondary/20">/</span>
                    {String(steps.length).padStart(2, "0")}
                </span>
            </div>
        </motion.div>
    );
};

export default JourneyTimeline;
