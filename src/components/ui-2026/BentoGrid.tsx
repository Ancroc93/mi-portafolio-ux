import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "./cn";

type BentoItem = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  video?: string;
  enableVideoPreview?: boolean;
  tag?: string;
  span?: 2 | 3 | 4 | 6; // col-span en md+ (grilla de 6 columnas)
  blocks?: Array<
    | { type: "text"; content: string }
    | { type: "list"; items: string[] }
    | { type: "image"; src: string; alt?: string }
    | { type: "gif"; src: string; alt?: string }
    | { type: "video"; src: string; alt?: string; poster?: string; embed?: boolean }
  >;
  caseStudyUrl?: string;
};

type BentoGridProps = {
  items: BentoItem[];
  className?: string;
};

const spring = { type: "spring", stiffness: 150, damping: 20 };

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
  const [spotlight, setSpotlight] = useState<{ x: number; y: number }>({
    x: 50,
    y: 50,
  });

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-6",
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
              "group relative overflow-hidden rounded-3xl border border-glass/2",
              "bg-linear-100/70 backdrop-blur-16 shadow-glass-sm text-left",
              "hover:-translate-y-1 hover:shadow-glass-lg transition will-change-transform",
              colSpanClass(item.span)
            )}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId((prev) => (prev === item.id ? null : prev))}
            onMouseMove={(e) => {
              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;
              setSpotlight({ x, y });
            }}
          >
            <div className="absolute inset-0 bg-linear-radial pointer-events-none" />
            {item.image && (
              <div className="absolute inset-0">
                {item.video && item.enableVideoPreview && hoveredId === item.id ? (
                  <video
                    className="h-full w-full object-cover opacity-85 transition duration-500"
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
                    className="h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45),transparent_40%,rgba(0,0,0,0.6))]" />
              </div>
            )}
            <div
              className={cn(
                "pointer-events-none absolute inset-0 opacity-0 transition duration-200",
                hoveredId === item.id && "opacity-100"
              )}
              style={{
                background: `radial-gradient(220px at ${spotlight.x}% ${spotlight.y}%, rgba(255,255,255,0.12), transparent 55%)`,
              }}
            />
            <div className="relative z-10 flex h-full flex-col gap-3 p-5 sm:p-6 text-mist">
              {item.tag && (
                <span className="inline-flex w-fit items-center rounded-full border border-glass/2 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-mist/80">
                  {item.tag}
                </span>
              )}
              <h3 className="text-xl font-semibold leading-tight">{item.title}</h3>
              {item.description && (
                <p className="text-sm text-mist/80 line-clamp-3">
                  {item.description}
                </p>
              )}
            </div>
          </MotionLink>
        ))}
      </div>
    </>
  );
};

export default BentoGrid;
