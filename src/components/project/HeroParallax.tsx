import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef, useEffect, useCallback, type ReactNode } from "react";

interface HeroParallaxProps {
    title: string;
    subtitle?: ReactNode;
    backgroundImage?: string;
    backgroundVideo?: string;
    accentColor?: string;
}

const HeroParallax = ({
    title,
    subtitle,
    backgroundImage,
    backgroundVideo,
    accentColor = "#ffffff",
}: HeroParallaxProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

    // Force video playback — some browsers pause videos inside transformed containers
    const ensurePlayback = useCallback(() => {
        const video = videoRef.current;
        if (video && video.paused) {
            video.play().catch(() => { });
        }
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Try to play on mount
        video.play().catch(() => { });

        // Re-trigger if browser pauses it (e.g. due to GPU transform)
        const interval = setInterval(ensurePlayback, 1000);
        video.addEventListener("pause", ensurePlayback);

        return () => {
            clearInterval(interval);
            video.removeEventListener("pause", ensurePlayback);
        };
    }, [ensurePlayback]);

    return (
        <div
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20"
            style={{ "--project-accent": accentColor } as React.CSSProperties}
        >
            {/* Parallax Background — oversized to prevent gap during scroll */}
            <motion.div
                className="absolute -top-[25%] left-0 right-0 h-[150%] z-0"
                style={{ y }}
            >
                {backgroundVideo ? (
                    <video
                        ref={videoRef}
                        src={backgroundVideo}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div
                        className="h-full w-full bg-cover bg-center"
                        style={{
                            backgroundImage: backgroundImage
                                ? `url(${backgroundImage})`
                                : "linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.4))",
                        }}
                    />
                )}
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/75" />
            </motion.div>

            {/* Content */}
            <motion.div
                className="relative z-10 flex flex-col items-center text-center px-6 max-w-7xl h-fit gap-0 pb-[49px]"
                style={{ opacity }}
            >
                <motion.h1
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[0.95] md:leading-[0.9] mb-6"
                    style={{
                        textShadow: "0 4px 30px rgba(0,0,0,0.3)",
                    }}
                >
                    {title}
                </motion.h1>

                {subtitle && (
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col gap-6 text-xl md:text-3xl font-light text-white/90 max-w-3xl"
                    >
                        {typeof subtitle === "string"
                            ? subtitle.split(/\r?\n\r?\n/).map((p, i) => <p key={i}>{p}</p>)
                            : subtitle
                        }
                    </motion.div>
                )}
            </motion.div>

            {/* Scroll Down Indicator */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-0 h-fit"
            >
                <span className="text-xs font-mono uppercase tracking-widest text-white/60">
                    Scroll
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <ChevronDown className="h-6 w-6 text-white/80" />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default HeroParallax;
