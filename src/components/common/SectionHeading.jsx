export default function SectionHeading({ eyebrow, title, subtitle, center = true }) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""} mb-10`}>
      {eyebrow && <p className="text-xs font-bold tracking-widest text-blue-700 uppercase mb-2">{eyebrow}</p>}
      <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-2">
        {title}
      </h2>
      <span className="block w-16 h-1 rainbow-underline rounded-full mx-auto mb-3" />
      {subtitle && <p className="text-slate-500 text-sm sm:text-base">{subtitle}</p>}
    </div>
  );
}
