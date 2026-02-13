import { motion } from "framer-motion";
import { cn } from "./cn";

const Section = ({
  title = "Panel espacial",
  subtitle = "Layout inspirado en Linear + Spatial",
  children,
  className,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn("relative flex flex-col gap-8", className)}
    >
      <div className="flex flex-col gap-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-secondary/70 pl-1">
          {subtitle}
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tighter leading-tight max-w-2xl">
          {title}
        </h2>
      </div>
      <div className="text-secondary/80 leading-relaxed">
        {children}
      </div>
    </motion.section>
  );
};

export default Section;
