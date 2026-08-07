import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-500 flex items-center flex-wrap gap-1">
      <Link to="/" className="flex items-center gap-1 hover:text-blue-700">
        <Home className="w-3.5 h-3.5" /> Home
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="w-3.5 h-3.5" />
          {item.to ? (
            <Link to={item.to} className="hover:text-blue-700">{item.label}</Link>
          ) : (
            <span className="text-slate-700 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
