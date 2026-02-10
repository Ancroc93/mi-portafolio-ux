import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, type MouseEvent } from "react";

interface VideoShowcaseProps {
    src: string;
    mimeType?: string;
    accentColor?: string;
}

const VideoShowcase = ({
    src,
    mimeType = "video/mp4",
    accentColor = "#2D6AE0",
}: VideoShowcaseProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // --- Scroll-driven cinematic reveal ---
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center"],
    });

    const revealScale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
    const revealOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
    const revealBlur = useTransform(scrollYProgress, [0, 0.5], [12, 0]);
    const revealY = useTransform(scrollYProgress, [0, 1], [60, 0]);

    // --- 3D perspective tilt on hover ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
        stiffness: 200,
        damping: 30,
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
        stiffness: 200,
        damping: 30,
    });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={containerRef}
            className="relative w-full"
            style={{
                perspective: 1200,
            }}
        >
            {/* Ambient glow behind the frame (reduced intensity) */}
            <motion.div
                className="absolute -inset-8 rounded-3xl opacity-20 blur-3xl pointer-events-none"
                style={{
                    background: `radial-gradient(ellipse at 50% 50%, ${accentColor}22, ${accentColor}0a, transparent 70%)`,
                    scale: revealScale,
                    opacity: revealOpacity,
                }}
                aria-hidden
            />
            <motion.div
                className="absolute -inset-4 rounded-3xl pointer-events-none animate-glow-pulse-subtle"
                style={{
                    background: `radial-gradient(ellipse at 50% 40%, ${accentColor}15, transparent 60%)`,
                }}
                aria-hidden
            />

            {/* 3D Tilt wrapper */}
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    scale: revealScale,
                    opacity: revealOpacity,
                    y: revealY,
                    filter: useTransform(revealBlur, (v) => `blur(${v}px)`),
                    transformStyle: "preserve-3d",
                }}
                className="relative will-change-transform"
            >
                {/* Device frame — Browser chrome mockup */}
                <div className="rounded-2xl border border-white/[0.08] bg-[#1a1a1a]/80 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden video-showcase-frame">
                    {/* Browser top bar */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                        <div className="flex gap-[6px]">
                            <span className="w-[10px] h-[10px] rounded-full bg-white/10" />
                            <span className="w-[10px] h-[10px] rounded-full bg-white/10" />
                            <span className="w-[10px] h-[10px] rounded-full bg-white/10" />
                        </div>
                        <div className="flex-1 mx-8">
                            <div className="mx-auto max-w-[260px] h-[22px] rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                                <span className="text-[10px] font-mono text-white/20 tracking-wider select-none">
                                    mercadopago.com
                                </span>
                            </div>
                        </div>
                        <div className="w-[52px]" /> {/* Spacer for symmetry */}
                    </div>

                    {/* Video content with vignette */}
                    <div className="relative">
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            className="w-full h-auto block"
                        >
                            <source src={src} type={mimeType} />
                        </video>

                        {/* Top gradient vignette */}
                        <div
                            className="absolute inset-x-0 top-0 h-12 pointer-events-none"
                            style={{
                                background: "linear-gradient(to bottom, rgba(26,26,26,0.5), transparent)",
                            }}
                        />
                        {/* Bottom gradient vignette */}
                        <div
                            className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                            style={{
                                background: "linear-gradient(to top, rgba(26,26,26,0.6), transparent)",
                            }}
                        />

                        {/* Subtle inner shine on top edge */}
                        <div
                            className="absolute inset-x-0 top-0 h-px pointer-events-none"
                            style={{
                                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent)",
                            }}
                        />
                    </div>
                </div>

                {/* Reflection / shadow beneath the device */}
                <div
                    className="absolute -bottom-6 inset-x-4 h-12 rounded-full blur-2xl pointer-events-none"
                    style={{
                        background: `radial-gradient(ellipse at 50% 0%, ${accentColor}0c, transparent 70%)`,
                    }}
                    aria-hidden
                />
            </motion.div>
        </motion.div>
    );
};

export default VideoShowcase;
