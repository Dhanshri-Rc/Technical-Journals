import { motion } from "framer-motion";
import contactBg from "../../assets/images/contactbg.png";

export default function PageHero({
  eyebrow,
  title = "Contact Us",
  subtitle = "Get in touch with our team for support, inquiries, or collaboration opportunities.",
  bg = contactBg,
  children,
  height = "min-h-[310px] sm:min-h-[340px]",
}) {
  return (
    <section
      className={`relative overflow-hidden bg-[#06183d] text-white ${height}`}
    >
      {/* Hero background image */}
      <img
        src={bg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex min-h-[310px] w-full max-w-[1440px] items-center px-5 py-10 sm:min-h-[340px] sm:px-8 lg:px-16 xl:px-20">
        <div className="w-full max-w-[900px]">
          {eyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-300 sm:text-sm"
            >
              {eyebrow}
            </motion.p>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-2xl font-display text-[28px] font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[36px] lg:text-[38px]"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.08,
                ease: "easeOut",
              }}
              className="mt-3 max-w-[500px] text-[14px] leading-6 text-slate-100 sm:text-[16px] sm:leading-7"
            >
              {subtitle}
            </motion.p>
          )}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="mt-5"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}