import { useState } from "react";
import type { ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "./cn";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  enableSpotlight?: boolean;
  enableTilt?: boolean;
  videoSrc?: string; // Optional video background
  imageSrc?: string; // Fallback image
};

/**
 * Card con efecto “cristal líquido”: blur, fondo translúcido, borde interior brillante.
 * Opcional: spotlight que sigue el mouse y tilt sutil.
 */
const GlassCard = ({
  children,
  className,
  enableSpotlight = true,
  enableTilt = true,
  videoSrc,
  imageSrc,
}: GlassCardProps) => {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rX = useSpring(tiltX, { stiffness: 200, damping: 30 });
  const rY = useSpring(tiltY, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      style={{
        rotateX: enableTilt ? rX : 0,
        rotateY: enableTilt ? rY : 0,
        transformStyle: enableTilt ? "preserve-3d" : undefined,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (enableSpotlight) setSpotlight({ x: 50, y: 50 });
        if (enableTilt) {
          tiltX.set(0);
          tiltY.set(0);
        }
      }}
      onMouseMove={(e) => {
        if (!enableTilt && !enableSpotlight) return;
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        if (enableSpotlight) setSpotlight({ x, y });
        if (enableTilt) {
          const tiltAmount = 6;
          tiltX.set((0.5 - y / 100) * tiltAmount);
          tiltY.set((x / 100 - 0.5) * tiltAmount);
        }
      }}
      className={cn(
        "relative overflow-hidden rounded-3xl group",
        "border border-glass-border bg-surface/40 backdrop-blur-xl shadow-glass-sm",
        // inset glow para simular grosor
        "before:pointer-events-none before:absolute before:inset-[1px] before:rounded-[22px] before:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.1),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.05),transparent_45%)] before:opacity-90",
        "p-6 sm:p-8 text-mist transition-transform duration-200 will-change-transform",
        className
      )}
    >
      {/* Video/Image Background */}
      {(videoSrc || imageSrc) && (
        <div className="absolute inset-0 -z-10">
          {videoSrc && isHovered ? (
            <video
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-60 grayscale-[50%]"
            />
          ) : imageSrc ? (
            <img
              src={imageSrc}
              alt=""
              className="w-full h-full object-cover opacity-50 grayscale"
            />
          ) : null}
          <div className="absolute inset-0 bg-background/60" />
        </div>
      )}

      {enableSpotlight && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(260px at ${spotlight.x}% ${spotlight.y}%, rgba(255,255,255,0.08), transparent 60%)`,
          }}
        />
      )}
      <div className="relative z-10 flex flex-col gap-3">{children}</div>
    </motion.div>
  );
};

export default GlassCard;
