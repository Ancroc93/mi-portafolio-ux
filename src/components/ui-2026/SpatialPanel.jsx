import { motion } from "framer-motion";
import { cn } from "./cn";

const SpatialPanel = ({
  title = "Panel espacial",
  subtitle = "Layout inspirado en Linear + Spatial",
  children,
  className,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("relative overflow-hidden rounded-3xl", className)}
    >
      <div className="absolute inset-0 bg-linear-radial" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_10%,rgba(255,255,255,0.08),transparent)]" />
      <div className="relative border border-glass/2 bg-linear-100/70 backdrop-blur-16 shadow-glass-lg">
        <div className="flex flex-col gap-3 border-b border-glass/1 px-6 py-5 sm:px-8">
          <p className="text-xs uppercase tracking-[0.35em] text-mist/60">
            {subtitle}
          </p>
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            {title}
          </h2>
        </div>
        <div className="px-6 py-6 sm:px-8 sm:py-8 text-mist">{children}</div>
      </div>
    </motion.section>
  );
};

export default SpatialPanel;
