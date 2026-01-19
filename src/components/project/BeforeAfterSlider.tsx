import { motion } from "framer-motion";
import { useState, useRef } from "react";

interface BeforeAfterSliderProps {
    beforeImage: string;
    afterImage: string;
    beforeLabel?: string;
    afterLabel?: string;
    className?: string;
}

const BeforeAfterSlider = ({
    beforeImage,
    afterImage,
    beforeLabel = "Before",
    afterLabel = "After",
    className = "",
}: BeforeAfterSliderProps) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        setSliderPosition(Math.min(Math.max(percentage, 0), 100));
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) handleMove(e.clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (isDragging && e.touches[0]) handleMove(e.touches[0].clientX);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className={`w-full py-24 ${className}`}
        >
            <div className="mx-auto max-w-6xl px-6">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-12 text-center">
                    Before & After
                </h2>

                <div
                    ref={containerRef}
                    className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl cursor-col-resize select-none"
                    onMouseMove={handleMouseMove}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    onMouseLeave={() => setIsDragging(false)}
                    onTouchMove={handleTouchMove}
                    onTouchStart={() => setIsDragging(true)}
                    onTouchEnd={() => setIsDragging(false)}
                >
                    {/* Before Image (Full) */}
                    <div className="absolute inset-0">
                        <img
                            src={beforeImage}
                            alt={beforeLabel}
                            className="h-full w-full object-cover"
                            draggable={false}
                        />
                        <div className="absolute top-6 left-6 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full">
                            <span className="text-xs font-mono uppercase tracking-widest text-white">
                                {beforeLabel}
                            </span>
                        </div>
                    </div>

                    {/* After Image (Clipped) */}
                    <div
                        className="absolute inset-0 overflow-hidden"
                        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                    >
                        <img
                            src={afterImage}
                            alt={afterLabel}
                            className="h-full w-full object-cover"
                            draggable={false}
                        />
                        <div className="absolute top-6 right-6 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full">
                            <span className="text-xs font-mono uppercase tracking-widest text-white">
                                {afterLabel}
                            </span>
                        </div>
                    </div>

                    {/* Slider Handle */}
                    <div
                        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
                        style={{ left: `${sliderPosition}%` }}
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white shadow-xl flex items-center justify-center">
                            <div className="flex gap-1">
                                <div className="h-4 w-0.5 bg-black/40" />
                                <div className="h-4 w-0.5 bg-black/40" />
                            </div>
                        </div>
                    </div>
                </div>

                <p className="text-center text-sm text-secondary/60 mt-6 font-mono">
                    Drag to compare
                </p>
            </div>
        </motion.div>
    );
};

export default BeforeAfterSlider;
