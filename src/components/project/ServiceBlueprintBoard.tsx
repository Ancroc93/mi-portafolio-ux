import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* ================================================================
   SERVICE BLUEPRINT BOARD — Horizontal-lane interactive blueprint
   ================================================================ */

interface BlueprintPhase {
  label: string;
  span: number;
}

interface BlueprintMoment {
  label: string;
  touchpoints: string[];
  backstage: string[];
}

interface ServiceBlueprintBoardProps {
  title: string;
  subtitle: string;
  phases: BlueprintPhase[];
  moments: BlueprintMoment[];
  labels: {
    moments: string;
    touchpoints: string;
    backstage: string;
    frontstage: string;
  };
  highlightColumns?: number[];
  accentColor?: string;
}

/* ─── Helpers ──────────────────────────────────────────────────── */

const getPhaseRanges = (phases: BlueprintPhase[]) => {
  const ranges: { label: string; start: number; end: number }[] = [];
  let cursor = 0;
  for (const phase of phases) {
    ranges.push({ label: phase.label, start: cursor, end: cursor + phase.span - 1 });
    cursor += phase.span;
  }
  return ranges;
};

/* ─── Card sub-components ──────────────────────────────────────── */

const MomentCard = ({
  label,
  isActive,
  accentColor,
  delay,
}: {
  label: string;
  isActive: boolean;
  accentColor: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="relative rounded-lg px-3 py-2.5 min-h-[3.5rem] flex items-center transition-all duration-300"
    style={{
      background: isActive
        ? `linear-gradient(135deg, ${accentColor}25 0%, ${accentColor}10 100%)`
        : "rgba(255,255,255,0.04)",
      border: isActive
        ? `1px solid ${accentColor}50`
        : "1px solid rgba(255,255,255,0.07)",
      boxShadow: isActive
        ? `0 0 20px ${accentColor}15, inset 0 1px 0 ${accentColor}12`
        : "inset 0 1px 0 rgba(255,255,255,0.04)",
    }}
  >
    <span className="text-[10px] md:text-[11px] font-semibold text-primary/90 leading-tight">
      {label}
    </span>
  </motion.div>
);

const StickyCard = ({
  text,
  variant,
  isActive,
  accentColor,
  delay,
}: {
  text: string;
  variant: "touchpoint" | "backstage";
  isActive: boolean;
  accentColor: string;
  delay: number;
}) => {
  const styles =
    variant === "touchpoint"
      ? {
          bg: isActive ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.04)",
          border: isActive
            ? `1px solid ${accentColor}40`
            : "1px solid rgba(255,255,255,0.06)",
          shadow: isActive ? `0 4px 16px ${accentColor}12` : "none",
        }
      : {
          bg: isActive ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.025)",
          border: isActive
            ? "1px solid rgba(255,255,255,0.15)"
            : "1px solid rgba(255,255,255,0.04)",
          shadow: "none",
        };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay }}
      className="rounded-md px-2.5 py-1.5 backdrop-blur-sm transition-all duration-300"
      style={{
        background: styles.bg,
        border: styles.border,
        boxShadow: styles.shadow,
      }}
    >
      <span
        className={`text-[10px] md:text-[11px] leading-snug ${
          isActive ? "text-white/80" : "text-white/40"
        } transition-colors duration-300`}
      >
        {text}
      </span>
    </motion.div>
  );
};

/* ─── Lane row label ───────────────────────────────────────────── */

const LaneLabel = ({
  label,
  dotColor,
}: {
  label: string;
  dotColor: string;
}) => (
  <div className="sticky left-0 z-[2] flex items-center gap-2 bg-background/90 backdrop-blur-md px-4 py-3 min-w-[7rem] shrink-0 border-r border-white/[0.06]">
    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: dotColor }} />
    <span className="text-[9px] font-mono uppercase tracking-widest text-secondary/50 whitespace-nowrap">
      {label}
    </span>
  </div>
);

/* ─── Main Component ───────────────────────────────────────────── */

const ServiceBlueprintBoard = ({
  title,
  subtitle,
  phases,
  moments,
  labels,
  accentColor = "#C44536",
}: ServiceBlueprintBoardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

  const phaseRanges = getPhaseRanges(phases);
  const [activePhase, setActivePhase] = useState(0);
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);

  const activeRange = phaseRanges[activePhase];
  const visibleMoments = moments.slice(activeRange.start, activeRange.end + 1);
  const colCount = visibleMoments.length;

  const handlePhaseClick = useCallback((index: number) => {
    setActivePhase(index);
    setHoveredCol(null);
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full py-12 md:py-16"
      aria-label={title}
    >
      {/* ── Header ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">
          {title}
        </h3>
        <p className="mt-3 max-w-3xl text-base md:text-lg text-secondary/70 leading-relaxed font-light">
          {subtitle}
        </p>
      </motion.div>

      {/* ── Phase selector ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap gap-2 mb-8"
      >
        {phaseRanges.map((range, i) => {
          const isActive = i === activePhase;
          return (
            <button
              key={range.label}
              onClick={() => handlePhaseClick(i)}
              className="relative px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer"
              style={{
                background: isActive ? `${accentColor}20` : "rgba(255,255,255,0.04)",
                border: isActive
                  ? `1px solid ${accentColor}50`
                  : "1px solid rgba(255,255,255,0.08)",
                color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
                boxShadow: isActive ? `0 0 16px ${accentColor}15` : "none",
              }}
            >
              {range.label}
              {isActive && (
                <motion.span
                  layoutId="phase-indicator"
                  className="absolute -bottom-px left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                  style={{ backgroundColor: accentColor }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </motion.div>

      {/* ── Blueprint board ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden"
        style={{
          boxShadow: `0 0 0 1px ${accentColor}10, 0 8px 32px rgba(0,0,0,0.3)`,
        }}
      >
        <div className="overflow-x-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              style={{ minWidth: colCount > 4 ? `${colCount * 155}px` : undefined }}
            >
              {/* ── Step numbers row ─────────────────────────── */}
              <div className="flex border-b border-white/[0.04]">
                <div className="min-w-[7rem] shrink-0 border-r border-white/[0.06]" />
                <div className="flex-1 grid" style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}>
                  {visibleMoments.map((_, colIdx) => {
                    const globalIdx = activeRange.start + colIdx;
                    return (
                      <div
                        key={`num-${globalIdx}`}
                        className="px-2 pt-3 pb-1 text-center"
                        onMouseEnter={() => setHoveredCol(colIdx)}
                        onMouseLeave={() => setHoveredCol(null)}
                      >
                        <span className="text-[9px] font-mono text-secondary/25 tabular-nums">
                          {String(globalIdx + 1).padStart(2, "0")}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ── MOMENTS lane ──────────────────────────────── */}
              <div className="flex border-b border-white/[0.06]">
                <LaneLabel label={labels.moments} dotColor={accentColor} />
                <div
                  className="flex-1 grid gap-2 p-3"
                  style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
                >
                  {visibleMoments.map((moment, colIdx) => {
                    const isHovered = hoveredCol === colIdx;
                    return (
                      <div
                        key={`m-${activePhase}-${colIdx}`}
                        onMouseEnter={() => setHoveredCol(colIdx)}
                        onMouseLeave={() => setHoveredCol(null)}
                        className="cursor-default"
                      >
                        <MomentCard
                          label={moment.label}
                          isActive={isHovered}
                          accentColor={accentColor}
                          delay={colIdx * 0.04}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ── Line of interaction (visual separator) ──── */}
              <div className="flex items-center">
                <div className="min-w-[7rem] shrink-0 border-r border-white/[0.06]" />
                <div className="flex-1 relative h-6 flex items-center px-4">
                  <div
                    className="w-full h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent 0%, ${accentColor}40 20%, ${accentColor}40 80%, transparent 100%)`,
                    }}
                  />
                  <span
                    className="absolute left-1/2 -translate-x-1/2 px-3 text-[8px] font-mono uppercase tracking-[0.2em] bg-[#0c0c0c]"
                    style={{ color: `${accentColor}70` }}
                  >
                    line of interaction
                  </span>
                </div>
              </div>

              {/* ── TOUCHPOINTS lane ──────────────────────────── */}
              <div className="flex border-b border-white/[0.06]">
                <LaneLabel label={labels.touchpoints} dotColor="rgba(255,255,255,0.25)" />
                <div
                  className="flex-1 grid gap-2 p-3"
                  style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
                >
                  {visibleMoments.map((moment, colIdx) => {
                    const isHovered = hoveredCol === colIdx;
                    return (
                      <div
                        key={`tp-${activePhase}-${colIdx}`}
                        className="space-y-1.5 cursor-default"
                        onMouseEnter={() => setHoveredCol(colIdx)}
                        onMouseLeave={() => setHoveredCol(null)}
                      >
                        {moment.touchpoints.map((tp, i) => (
                          <StickyCard
                            key={tp}
                            text={tp}
                            variant="touchpoint"
                            isActive={isHovered}
                            accentColor={accentColor}
                            delay={colIdx * 0.04 + i * 0.03}
                          />
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ── Line of visibility (visual separator) ──── */}
              <div className="flex items-center">
                <div className="min-w-[7rem] shrink-0 border-r border-white/[0.06]" />
                <div className="flex-1 relative h-6 flex items-center px-4">
                  <div className="w-full h-px border-t border-dashed border-white/[0.08]" />
                  <span className="absolute left-1/2 -translate-x-1/2 px-3 text-[8px] font-mono uppercase tracking-[0.2em] text-secondary/25 bg-[#0c0c0c]">
                    line of visibility
                  </span>
                </div>
              </div>

              {/* ── BACKSTAGE lane ────────────────────────────── */}
              <div className="flex">
                <LaneLabel label={labels.backstage} dotColor="rgba(255,255,255,0.12)" />
                <div
                  className="flex-1 grid gap-2 p-3"
                  style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
                >
                  {visibleMoments.map((moment, colIdx) => {
                    const isHovered = hoveredCol === colIdx;
                    return (
                      <div
                        key={`bs-${activePhase}-${colIdx}`}
                        className="space-y-1.5 cursor-default"
                        onMouseEnter={() => setHoveredCol(colIdx)}
                        onMouseLeave={() => setHoveredCol(null)}
                      >
                        {moment.backstage.map((bs, i) => (
                          <StickyCard
                            key={bs}
                            text={bs}
                            variant="backstage"
                            isActive={isHovered}
                            accentColor={accentColor}
                            delay={colIdx * 0.04 + i * 0.03 + 0.08}
                          />
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] h-2" />
      </motion.div>
    </section>
  );
};

export default ServiceBlueprintBoard;
