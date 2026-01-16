import type { ReactNode } from "react";
import { cn } from "./cn";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Badge con contraste desacoplado: fondo translúcido + texto brillante para modo oscuro.
 */
const Badge = ({ children, className }: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-amber-300/30",
        "bg-amber-400/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]",
        "text-amber-100 shadow-[0_0_0_1px_rgba(255,200,0,0.08)]",
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
