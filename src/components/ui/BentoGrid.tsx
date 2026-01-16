import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "./cn";
import { ArrowUpRight } from "lucide-react";

type BentoItem = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  video?: string;
  enableVideoPreview?: boolean;
  tag?: string;
  span?: 2 | 3 | 4 | 6; // col-span en md+ (grilla de 6 columnas)
  metrics?: { label: string; value: string }[];
  blocks?: any[];
  caseStudyUrl?: string;
};

type BentoGridProps = {
  items: BentoItem[];
  className?: string;
};

const spring = { type: "spring", stiffness: 150, damping: 20 } as const;

const colSpanClass = (span?: number) => {
  switch (span) {
    case 2:
      return "md:col-span-2";
    case 3:
      return "md:col-span-3";
    case 4:
      return "md:col-span-4";
    case 6:
      return "md:col-span-6";
    default:
      return "md:col-span-3";
  }
};

const MotionLink = motion(Link);

const BentoGrid = ({ items, className }: BentoGridProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Function to determine if a card is "Hero" size (span 6 or 4) for styling purposes
  const isHero = (span?: number) => span === 6 || span === 4;

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-6 auto-rows-[400px] md:auto-rows-[500px]",
          className
        )}
      >
        {items.map((item) => (
          <MotionLink
            to={`/projects/${item.id}`}
            key={item.id}
            layoutId={`card-${item.id}`}
            transition={spring}
            className={cn(
              "group relative overflow-hidden rounded-3xl border border-glass-border",
              "bg-surface/50 backdrop-blur-xl shadow-glass-sm text-left will-change-transform",
              "hover:border-primary/20 hover:shadow-glass-lg",
              colSpanClass(item.span)
            )}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Media Background */}
            {item.image && (
              <div className="absolute inset-0 z-0">
                {item.video && item.enableVideoPreview && hoveredId === item.id ? (
                  <video
                    className="h-full w-full object-cover transition duration-700"
                    src={item.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={item.image}
                  />
                ) : (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                )}
                {/* Gradient Overlay - Cinematic Fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            )}

            {/* Content Overlay */}
            <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
              {/* Top: Tags & Arrow */}
              <div className="flex items-start justify-between">
                {item.tag && (
                  <span className={cn(
                    "inline-flex items-center rounded-sm px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-sm transition-colors duration-300",
                    hoveredId === item.id
                      ? "bg-accent text-background border-accent"
                      : "bg-white/10 text-primary border border-white/10"
                  )}>
                    {item.tag}
                  </span>
                )}
                <div className="rounded-full bg-white/10 p-2 backdrop-blur-md opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="h-5 w-5 text-primary" />
                </div>
              </div>

              {/* Bottom: Title, Metrics, Desc */}
              <div className="flex flex-col gap-4">
                {/* Title */}
                <h3 className={cn(
                  "font-bold leading-none text-primary tracking-tighter transition-transform duration-300 group-hover:-translate-y-2",
                  isHero(item.span) ? "text-5xl md:text-7xl" : "text-3xl md:text-4xl"
                )}>
                  {item.title}
                </h3>

                {/* Divider */}
                <div className="h-px w-full bg-glass-border origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />

                {/* Metrics & Description Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
                  <div className="flex flex-col gap-2">
                    {item.description && (
                      <p className="text-sm text-secondary/90 leading-relaxed font-medium">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Quick Stats */}
                  {item.metrics && item.metrics.length > 0 && (
                    <div className="flex gap-4">
                      {item.metrics.slice(0, 2).map((metric, i) => (
                        <div key={i}>
                          <span className="block text-2xl font-bold text-primary">{metric.value}</span>
                          <span className="text-[10px] uppercase tracking-widest text-secondary">{metric.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </MotionLink>
        ))}
      </div>
    </>
  );
};

export default BentoGrid;
