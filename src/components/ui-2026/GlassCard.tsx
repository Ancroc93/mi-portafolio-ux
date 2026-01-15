import { useState } from "react";
import type { ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "./cn";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  enableSpotlight?: boolean;
  enableTilt?: boolean;
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
}: GlassCardProps) => {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
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
      onMouseLeave={() => {
        if (enableSpotlight) setSpotlight({ x: 50, y: 50 });
        if (enableTilt) {
          tiltX.set(0);
          tiltY.set(0);
        }
      }}
      className={cn(
        "relative overflow-hidden rounded-3xl group",
        "border border-glass/2 bg-linear-100/60 backdrop-blur-16 shadow-glass-sm",
        // inset glow para simular grosor
        "before:pointer-events-none before:absolute before:inset-[1px] before:rounded-[22px] before:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.12),transparent_45%)] before:opacity-90",
        // brillo interno sutil
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-[22px] after:shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]",
        "p-6 sm:p-8 text-mist transition-transform duration-200 will-change-transform",
        className
      )}
    >
      {enableSpotlight && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition duration-150 group-hover:opacity-100"
          style={{
            background: `radial-gradient(260px at ${spotlight.x}% ${spotlight.y}%, rgba(255,255,255,0.12), transparent 60%)`,
          }}
        />
      )}
      <div className="relative z-10 flex flex-col gap-3">{children}</div>
    </motion.div>
  );
};

export default GlassCard;
