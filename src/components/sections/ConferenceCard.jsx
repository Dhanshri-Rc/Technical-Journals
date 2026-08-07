import { Link } from "react-router-dom";
import { CalendarDays, MapPin } from "lucide-react";

export default function ConferenceCard({ conf }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 flex flex-col sm:flex-row gap-5 hover:shadow-lg transition-shadow">
      <div className={`w-full sm:w-28 h-20 sm:h-24 shrink-0 rounded-md ${conf.color} text-white flex flex-col items-center justify-center font-display font-bold`}>
        <span className="text-xs opacity-80">{conf.code.split(" ")[0]}</span>
        <span className="text-lg">{conf.code.split(" ")[1]}</span>
      </div>
      <div className="flex-1">
        <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">{conf.type}</span>
        <h3 className="font-display font-semibold text-lg text-slate-900 mt-2 mb-1">{conf.title}</h3>
        <p className="text-xs text-slate-500 mb-2">Organized by: {conf.org}</p>
        <p className="text-sm text-slate-600 mb-3">{conf.desc}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {conf.topics.map((t) => (
            <span key={t} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-1 rounded">{t}</span>
          ))}
        </div>
      </div>
      <div className="flex sm:flex-col justify-between sm:items-end gap-3 sm:w-52 shrink-0 sm:text-right">
        <div className="text-xs text-slate-600 space-y-1.5">
          <p className="flex items-center gap-1.5 sm:justify-end"><CalendarDays className="w-3.5 h-3.5 text-blue-700" /> {conf.date}</p>
          <p className="flex items-center gap-1.5 sm:justify-end"><MapPin className="w-3.5 h-3.5 text-blue-700" /> {conf.location}</p>
        </div>
        <Link
          to={`/conferences/${conf.id}`}
          className="text-xs font-semibold px-4 py-2 rounded-md border border-blue-600 text-blue-700 hover:bg-blue-50 whitespace-nowrap"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
