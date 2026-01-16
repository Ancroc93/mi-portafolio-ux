import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useI18n } from "../../i18n";

const Hero = () => {
  const { t } = useI18n();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 200, damping: 50 });
  const skew = useTransform(smooth, [-2000, 0, 2000], [5, 0, -5]);

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-20 pb-16 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent_50%)]" />

      <div className="mx-auto w-full max-w-7xl px-6 flex flex-col gap-12">
        {/* Status / Role */}
        <div className="flex flex-col gap-2">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-sm text-secondary uppercase tracking-widest pl-1"
          >
            {t("hero.role")}
          </motion.span>
        </div>

        {/* Main Headline */}
        <motion.div
          style={{ skewY: skew }}
          className="origin-left flex flex-col gap-2"
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl/none font-bold tracking-tighter text-primary max-w-5xl"
          >
            {t("hero.headline")}
            <span className="text-secondary block">{t("hero.headlineHighlight")}</span>
          </motion.h1>
        </motion.div>

        {/* Description & Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col md:flex-row gap-10 md:items-end justify-between max-w-5xl"
        >
          <p className="font-mono text-sm md:text-base text-secondary max-w-xl leading-relaxed">
            {t("hero.summary")}
          </p>

          <div className="flex gap-8">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-primary">8+</span>
              <span className="text-xs font-mono text-secondary uppercase tracking-wider">
                {t("hero.yearsExp")}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-primary">9+</span>
              <span className="text-xs font-mono text-secondary uppercase tracking-wider">
                {t("hero.countries")}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-6 md:left-auto md:right-6 mix-blend-difference"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-secondary uppercase tracking-widest animate-bounce">
            {t("hero.scroll")}
            <ArrowDown className="h-3 w-3" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
