import type { ReactNode } from "react";
import { cn } from "./cn";

type TextProps = {
  children: ReactNode;
  className?: string;
};

export const H1 = ({ children, className }: TextProps) => (
  <h1
    className={cn(
      "text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight",
      "tracking-[-0.04em] text-mist",
      className
    )}
  >
    {children}
  </h1>
);

export const H2 = ({ children, className }: TextProps) => (
  <h2
    className={cn(
      "text-3xl sm:text-4xl font-semibold leading-tight",
      "tracking-[-0.03em] text-mist",
      className
    )}
  >
    {children}
  </h2>
);

export const Paragraph = ({ children, className }: TextProps) => (
  <p
    className={cn(
      "text-base sm:text-lg leading-relaxed text-mist/80",
      "tracking-[0.005em]",
      className
    )}
  >
    {children}
  </p>
);

export const MonoText = ({ children, className }: TextProps) => (
  <span
    className={cn(
      "font-mono text-sm sm:text-base text-mist/80",
      "tracking-[0.08em]",
      className
    )}
  >
    {children}
  </span>
);
