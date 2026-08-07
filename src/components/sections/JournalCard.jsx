import { Link } from "react-router-dom";
import Icon from "../ui/Icon";

export default function JournalCard({ journal }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow group">
      <div className={`h-32 bg-gradient-to-br ${journal.color} flex items-center justify-center relative`}>
        <Icon name={journal.icon} className="w-10 h-10 text-white/90" />
        <span className="absolute top-3 left-3 text-[10px] font-semibold bg-white/90 text-slate-800 px-2 py-0.5 rounded">
          {journal.index}
        </span>
        <span className="absolute top-3 right-3 text-[10px] font-medium bg-black/30 text-white px-2 py-0.5 rounded">
          ISSN: {journal.issn}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm text-slate-900 leading-snug mb-1 line-clamp-2 group-hover:text-blue-700">
          {journal.title}
        </h3>
        <p className="text-xs text-slate-500 mb-1">{journal.field}</p>
        <p className="text-xs text-slate-400 mb-4">{journal.freq}</p>
        <div className="flex gap-2">
          <Link
            to={`/journals/${journal.id}`}
            className="flex-1 text-center text-xs font-semibold px-3 py-2 rounded-md border border-blue-600 text-blue-700 hover:bg-blue-50 transition-colors"
          >
            View Details
          </Link>
          <Link
            to={`/journals/${journal.id}#visit`}
            className="flex-1 text-center text-xs font-semibold px-3 py-2 rounded-md border border-green-600 text-green-700 hover:bg-green-50 transition-colors"
          >
            Visit Journal
          </Link>
        </div>
      </div>
    </div>
  );
}
