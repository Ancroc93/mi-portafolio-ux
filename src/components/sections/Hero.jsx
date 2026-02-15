import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { useI18n } from "../../i18n";

/* ── Aurora orbs config ── */
const auroraOrbs = [
  {
    className:
      "absolute -top-1/4 -left-1/4 w-[70vw] h-[70vw] rounded-full",
    gradient:
      "radial-gradient(circle, rgba(45,106,224,0.8) 0%, transparent 70%)",
    css: "aurora-drift-1 18s ease-in-out infinite",
    baseOpacity: 0.12,
    // Scroll: drifts up and scales down
    yRange: [0, -120],
    scaleRange: [1, 0.7],
  },
  {
    className:
      "absolute -bottom-1/3 -right-1/4 w-[60vw] h-[60vw] rounded-full",
    gradient:
      "radial-gradient(circle, rgba(59,138,90,0.8) 0%, transparent 70%)",
    css: "aurora-drift-2 22s ease-in-out infinite",
    baseOpacity: 0.1,
    // Scroll: drifts down-right and scales up slightly
    yRange: [0, 80],
    scaleRange: [1, 1.2],
  },
  {
    className:
      "absolute top-1/4 right-1/3 w-[50vw] h-[50vw] rounded-full",
    gradient:
      "radial-gradient(circle, rgba(168,85,247,0.7) 0%, transparent 70%)",
    css: "aurora-drift-3 26s ease-in-out infinite",
    baseOpacity: 0.08,
    // Scroll: drifts up-left
    yRange: [0, -60],
    scaleRange: [1, 0.85],
  },
];

/* ── Clip-reveal variant ── */
const clipReveal = {
  hidden: {
    clipPath: "inset(100% 0 0 0)",
    opacity: 0,
  },
  visible: (delay = 0) => ({
    clipPath: "inset(0% 0 0 0)",
    opacity: 1,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: "easeOut" },
  }),
};

const Hero = () => {
  const { t } = useI18n();
  const sectionRef = useRef(null);

  // Scroll progress scoped to the hero section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Smooth scroll values for aurora
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Aurora scroll-driven transforms
  const auroraOpacity = useTransform(smoothProgress, [0, 0.8], [1, 0]);
  const orbTransforms = auroraOrbs.map((orb) => ({
    y: useTransform(smoothProgress, [0, 1], orb.yRange),
    scale: useTransform(smoothProgress, [0, 1], orb.scaleRange),
  }));

  // Headline skew (velocity-based)
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 200, damping: 50 });
  const skew = useTransform(smooth, [-2000, 0, 2000], [5, 0, -5]);

  // Content parallax on scroll
  const contentY = useTransform(smoothProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex flex-col justify-center pt-20 pb-16 overflow-hidden"
    >
      {/* ── Aurora Background ── */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ opacity: auroraOpacity }}
      >
        {/* Base gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_50%)]" />

        {/* Animated orbs with scroll parallax */}
        {auroraOrbs.map((orb, i) => (
          <motion.div
            key={i}
            className={orb.className}
            style={{
              background: orb.gradient,
              animation: orb.css,
              filter: "blur(80px)",
              willChange: "transform",
              opacity: orb.baseOpacity,
              y: orbTransforms[i].y,
              scale: orbTransforms[i].scale,
            }}
          />
        ))}

        {/* Noise / grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />
      </motion.div>

      {/* ── Content with scroll parallax ── */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-6xl px-6 flex flex-col gap-12"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* ── Role badge ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="flex flex-col gap-2"
        >
          <span className="font-mono text-sm text-secondary uppercase tracking-widest pl-1">
            {t("hero.role")}
          </span>
        </motion.div>

        {/* ── Headline with clip-reveal ── */}
        <motion.div
          style={{ skewY: skew }}
          className="origin-left flex flex-col gap-0"
        >
          {/* Line 1 */}
          <div className="overflow-hidden">
            <motion.h1
              variants={clipReveal}
              initial="hidden"
              animate="visible"
              custom={0.5}
              className="text-6xl md:text-8xl/none font-bold tracking-tighter text-primary max-w-5xl"
            >
              {t("hero.headline")}
            </motion.h1>
          </div>

          {/* Line 2 — highlight */}
          <div className="overflow-hidden">
            <motion.span
              variants={clipReveal}
              initial="hidden"
              animate="visible"
              custom={0.7}
              className="block text-6xl md:text-8xl/none font-bold tracking-tighter text-secondary max-w-5xl"
            >
              {t("hero.headlineHighlight")}
            </motion.span>
          </div>
        </motion.div>

        {/* ── Description & Metrics ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.0}
          className="flex flex-col md:flex-row gap-10 md:items-end justify-between max-w-5xl"
        >
          <p className="font-mono text-sm md:text-base text-secondary max-w-xl leading-relaxed">
            {t("hero.summary")}
          </p>

          <div className="flex gap-8">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-primary">8+</span>
              <span className="text-xs font-mono text-secondary uppercase tracking-widest">
                {t("hero.yearsExp")}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-primary">9+</span>
              <span className="text-xs font-mono text-secondary uppercase tracking-widest">
                {t("hero.countries")}
              </span>
            </div>
          </div>
        </motion.div>

      </motion.div>

      {/* ── Scroll Indicator (outside parallax container) ── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1.2}
        className="absolute bottom-8 right-6 z-20"
      >
        <div className="flex items-center gap-2 text-xs font-mono text-white/70 uppercase tracking-widest animate-bounce">
          {t("hero.scroll")}
          <ArrowDown className="h-3 w-3" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
