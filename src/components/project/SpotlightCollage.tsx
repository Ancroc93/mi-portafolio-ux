import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useState, useCallback, useEffect, useRef, type MouseEvent } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface CollageItem {
    src: string;
    type: "desktop" | "mobile";
    caption?: string;
}

interface SpotlightCollageProps {
    title?: string;
    items: CollageItem[];
    accentColor?: string;
    className?: string;
}

/* ------------------------------------------------------------------ */
/*  Layout presets — organic collage positions (% based)               */
/*  Each position: { x, y, rotate, scale, zIndex }                    */
/* ------------------------------------------------------------------ */

const collagePositions = [
    { x: 2, y: 8, rotate: -3.5, scale: 0.95, z: 2 },   // desk 1
    { x: 34, y: 0, rotate: 2.2, scale: 0.95, z: 3 },   // desk 2
    { x: 18, y: 118, rotate: -2, scale: 0.9, z: 4 },   // desk 3
    { x: 50, y: 108, rotate: 2.8, scale: 0.9, z: 1 },  // desk 4
    { x: 72, y: 10, rotate: -5, scale: 1, z: 6 },      // mobile 1
    { x: 84, y: 70, rotate: 4.5, scale: 1, z: 7 },     // mobile 2
    { x: 70, y: 106, rotate: -4, scale: 1, z: 5 },     // mobile 3
    { x: 6, y: 74, rotate: 5, scale: 1, z: 5 },        // mobile 4
];

/* ------------------------------------------------------------------ */
/*  Device Frame                                                       */
/* ------------------------------------------------------------------ */

const DeviceFrame = ({
    type,
    children,
}: {
    type: "desktop" | "mobile";
    children: React.ReactNode;
}) => {
    if (type === "mobile") {
        return (
            <div className="rounded-[20px] border-2 border-white/10 bg-[#1a1a1a] p-1.5 shadow-2xl shadow-black/50">
                {/* Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1.5 rounded-full bg-white/10 z-10" />
                <div className="rounded-[14px] overflow-hidden">
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-white/10 bg-[#1a1a1a] shadow-2xl shadow-black/50 overflow-hidden">
            {/* Browser bar */}
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.06] bg-white/[0.02]">
                <span className="w-2 h-2 rounded-full bg-white/10" />
                <span className="w-2 h-2 rounded-full bg-white/10" />
                <span className="w-2 h-2 rounded-full bg-white/10" />
            </div>
            {children}
        </div>
    );
};

/* ------------------------------------------------------------------ */
/*  Placeholder                                                        */
/* ------------------------------------------------------------------ */

const Placeholder = ({ type, index }: { type: "desktop" | "mobile"; index: number }) => {
    const isDesktop = type === "desktop";
    const hue = (index * 47 + 200) % 360;
    return (
        <div
            className={`flex items-center justify-center ${isDesktop ? "aspect-video" : "aspect-[9/16]"}`}
            style={{
                background: `linear-gradient(135deg, hsl(${hue}, 30%, 12%), hsl(${hue}, 40%, 8%))`,
            }}
        >
            <div className="flex flex-col items-center gap-2 opacity-30">
                <div className={`rounded-lg border border-dashed border-white/20 ${isDesktop ? "w-16 h-10" : "w-8 h-14"}`} />
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                    {type} · {index + 1}
                </span>
            </div>
        </div>
    );
};

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

const SpotlightCollage = ({
    title,
    items,
    accentColor = "#2D6AE0",
    className = "",
}: SpotlightCollageProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    // Parallax on mouse move
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 150, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 150, damping: 30 });

    const handleMouseMove = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            if (focusedIndex !== null) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
            mouseX.set(x);
            mouseY.set(y);
        },
        [focusedIndex, mouseX, mouseY]
    );

    const handleMouseLeave = useCallback(() => {
        mouseX.set(0);
        mouseY.set(0);
    }, [mouseX, mouseY]);

    // Navigation in focus mode
    const navigate = useCallback(
        (direction: number) => {
            if (focusedIndex === null) return;
            const next = (focusedIndex + direction + items.length) % items.length;
            setFocusedIndex(next);
        },
        [focusedIndex, items.length]
    );

    // Keyboard navigation
    useEffect(() => {
        if (focusedIndex === null) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") setFocusedIndex(null);
            if (e.key === "ArrowRight") navigate(1);
            if (e.key === "ArrowLeft") navigate(-1);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [focusedIndex, navigate]);

    // Lock body scroll when focused
    useEffect(() => {
        if (focusedIndex !== null) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [focusedIndex]);

    return (
        <div className={`w-full py-20 md:py-24 ${className}`}>
            <div className="mx-auto max-w-6xl px-6">
                {title && (
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-6 text-left"
                    >
                        {title}
                    </motion.h2>
                )}

                {/* Collage area */}
                <div
                    ref={containerRef}
                    className="relative w-full"
                    style={{ minHeight: "300px" }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    {items.map((item, index) => {
                        const pos = collagePositions[index % collagePositions.length];
                        const isDesktop = item.type === "desktop";
                        const width = isDesktop ? "34%" : "12%";
                        const depthFactor = (pos.z / 5) * 1;

                        return (
                            <motion.div
                                key={index}
                                layoutId={`collage-item-${index}`}
                                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: pos.scale }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.08,
                                    layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                                }}
                                whileHover={{
                                    scale: (pos.scale || 1) * 1.05,
                                    zIndex: 20,
                                    rotate: 0,
                                    transition: { duration: 0.3 },
                                }}
                                className="absolute cursor-pointer"
                                style={{
                                    left: `${pos.x}%`,
                                    top: `${pos.y}px`,
                                    width,
                                    zIndex: pos.z,
                                    rotate: pos.rotate,
                                    x: springX.get() * depthFactor,
                                    y: springY.get() * depthFactor,
                                }}
                                onClick={() => setFocusedIndex(index)}
                            >
                                <motion.div
                                    style={{
                                        x: useSpring(
                                            useMotionValue(0),
                                            { stiffness: 150, damping: 30 }
                                        ),
                                    }}
                                >
                                    <DeviceFrame type={item.type}>
                                        {item.src ? (
                                            <img
                                                src={item.src}
                                                alt={item.caption || `Screen ${index + 1}`}
                                                className="w-full h-auto block"
                                                loading="lazy"
                                                draggable={false}
                                            />
                                        ) : (
                                            <Placeholder type={item.type} index={index} />
                                        )}
                                    </DeviceFrame>
                                    {item.caption && (
                                        <p className="mt-3 text-[11px] font-mono text-secondary/40 uppercase tracking-wider truncate">
                                            {item.caption}
                                        </p>
                                    )}
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Focus overlay */}
                <AnimatePresence>
                    {focusedIndex !== null && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
                                onClick={() => setFocusedIndex(null)}
                            />

                            {/* Focused item */}
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-12 pointer-events-none">
                                <motion.div
                                    layoutId={`collage-item-${focusedIndex}`}
                                    transition={{
                                        layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                                    }}
                                    className={`pointer-events-auto ${
                                        items[focusedIndex].type === "desktop"
                                            ? "w-full max-w-4xl"
                                            : "w-full max-w-xs"
                                    }`}
                                    style={{ rotate: 0 }}
                                >
                                    <DeviceFrame type={items[focusedIndex].type}>
                                        {items[focusedIndex].src ? (
                                            <img
                                                src={items[focusedIndex].src}
                                                alt={items[focusedIndex].caption || ""}
                                                className="w-full h-auto block"
                                                draggable={false}
                                            />
                                        ) : (
                                            <Placeholder
                                                type={items[focusedIndex].type}
                                                index={focusedIndex}
                                            />
                                        )}
                                    </DeviceFrame>

                                    {items[focusedIndex].caption && (
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="mt-4 text-sm font-mono text-secondary/60 uppercase tracking-wider text-center"
                                        >
                                            {items[focusedIndex].caption}
                                        </motion.p>
                                    )}
                                </motion.div>

                                {/* Navigation controls */}
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="pointer-events-auto absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                                    onClick={() => navigate(-1)}
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </motion.button>

                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="pointer-events-auto absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                                    onClick={() => navigate(1)}
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </motion.button>

                                {/* Close button */}
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="pointer-events-auto absolute top-4 md:top-8 right-4 md:right-8 w-10 h-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                                    onClick={() => setFocusedIndex(null)}
                                >
                                    <X className="w-4 h-4" />
                                </motion.button>

                                {/* Counter */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2"
                                >
                                    <span className="text-[11px] font-mono text-white/30 tracking-widest">
                                        {focusedIndex + 1} / {items.length}
                                    </span>
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SpotlightCollage;
