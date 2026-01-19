import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";

interface HeroParallaxProps {
    title: string;
    subtitle?: string;
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
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

    return (
        <div
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={{ "--project-accent": accentColor } as React.CSSProperties}
        >
            {/* Parallax Background */}
            <motion.div
                className="absolute inset-0 -z-10"
                style={{ y }}
            >
                {backgroundVideo ? (
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="h-full w-full object-cover"
                    >
                        <source src={backgroundVideo} type="video/mp4" />
                    </video>
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
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
            </motion.div>

            {/* Content */}
            <motion.div
                className="relative z-10 flex flex-col items-center text-center px-6 max-w-7xl"
                style={{ opacity }}
            >
                <motion.h1
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-7xl md:text-9xl font-bold tracking-tighter text-white leading-[0.85] mb-6"
                    style={{
                        textShadow: "0 4px 30px rgba(0,0,0,0.3)",
                    }}
                >
                    {title}
                </motion.h1>

                {subtitle && (
                    <motion.p
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="text-xl md:text-3xl font-light text-white/90 max-w-3xl"
                    >
                        {subtitle}
                    </motion.p>
                )}
            </motion.div>

            {/* Scroll Down Indicator */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
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
