import { motion } from "framer-motion";

export default function PageHero({ eyebrow, title, subtitle, bg, children, height = "py-16 sm:py-20" }) {
  return (
    <section
      className={`relative overflow-hidden bg-[#0a1a3f] text-white ${height}`}
      style={
        bg
          ? {
              backgroundImage: `linear-gradient(100deg, rgba(10,26,63,0.94) 30%, rgba(10,26,63,0.55) 100%), url(${bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {eyebrow && (
          <p className="text-xs font-bold tracking-widest text-blue-300 uppercase mb-3">{eyebrow}</p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl max-w-2xl"
        >
          {title}
        </motion.h1>
        {subtitle && <p className="mt-4 text-slate-200 max-w-xl text-sm sm:text-base">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
