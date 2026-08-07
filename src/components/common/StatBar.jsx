import Icon from "../ui/Icon";
import { STATS } from "../../data/site";
import { motion } from "framer-motion";

export default function StatBar({ variant = "light" }) {
  const wrap =
    variant === "dark"
      ? "bg-[#0a1a3f] text-white"
      : "bg-white text-slate-900 shadow-sm border border-slate-100";
  return (
    <div className={`rounded-xl ${wrap} px-4 sm:px-8 py-6`}>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="flex items-center gap-3"
          >
            <span className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${s.color}`}>
              <Icon name={s.icon} className="w-5 h-5" />
            </span>
            <div className="leading-tight">
              <p className={`font-bold text-lg ${variant === "dark" ? "text-white" : "text-slate-900"}`}>{s.value}</p>
              <p className={`text-xs ${variant === "dark" ? "text-slate-300" : "text-slate-500"}`}>{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
