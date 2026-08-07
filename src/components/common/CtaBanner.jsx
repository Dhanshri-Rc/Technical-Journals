import { Link } from "react-router-dom";
import Icon from "../ui/Icon";

export default function CtaBanner({
  icon = "Send",
  title = "Ready to Host Your Journal?",
  subtitle = "Join hundreds of universities worldwide and give your research the platform it deserves.",
  primary = { label: "Host Your Journal", to: "/register" },
  secondary = { label: "Schedule a Demo", to: "/contact" },
}) {
  return (
    <section className="rainbow-gradient">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="flex items-center gap-4 text-white text-center md:text-left">
          <span className="hidden sm:flex w-14 h-14 rounded-full bg-white/15 items-center justify-center shrink-0">
            <Icon name={icon} className="w-6 h-6 text-white" />
          </span>
          <div>
            <h3 className="font-display font-bold text-xl sm:text-2xl">{title}</h3>
            <p className="text-sm text-white/90 mt-1 max-w-lg">{subtitle}</p>
          </div>
        </div>
        <div className="flex gap-3 shrink-0">
          <Link
            to={primary.to}
            className="px-5 py-2.5 rounded-md bg-white text-blue-700 text-sm font-semibold hover:bg-blue-50 transition-colors"
          >
            {primary.label}
          </Link>
          <Link
            to={secondary.to}
            className="px-5 py-2.5 rounded-md border border-white text-white text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            {secondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
