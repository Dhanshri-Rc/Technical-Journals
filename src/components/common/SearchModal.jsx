import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { X, Search } from "lucide-react";
import { JOURNALS, CONFERENCES } from "../../data/site";

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const q = query.trim().toLowerCase();
  const journalResults = q
    ? JOURNALS.filter((j) => j.title.toLowerCase().includes(q) || j.field.toLowerCase().includes(q)).slice(0, 5)
    : [];
  const conferenceResults = q
    ? CONFERENCES.filter((c) => c.title.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)).slice(0, 5)
    : [];

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-slate-900/50" role="dialog" aria-modal="true" aria-label="Site search">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search journals, conferences, articles..."
            className="flex-1 outline-none text-sm py-2 focus-visible:ring-2 focus-visible:ring-blue-200 rounded"
          />
          <button onClick={onClose} aria-label="Close search" className="p-1 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto p-2">
          {!q && <p className="text-sm text-slate-400 px-3 py-6 text-center">Start typing to search journals and conferences.</p>}
          {q && journalResults.length === 0 && conferenceResults.length === 0 && (
            <p className="text-sm text-slate-400 px-3 py-6 text-center">No results for "{query}".</p>
          )}
          {journalResults.length > 0 && (
            <div className="mb-2">
              <p className="text-xs font-semibold text-slate-400 uppercase px-3 py-1">Journals</p>
              {journalResults.map((j) => (
                <button
                  key={j.id}
                  onClick={() => { navigate(`/journals/${j.id}`); onClose(); setQuery(""); }}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50 text-sm text-slate-700"
                >
                  {j.title}
                </button>
              ))}
            </div>
          )}
          {conferenceResults.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase px-3 py-1">Conferences</p>
              {conferenceResults.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { navigate(`/conferences/${c.id}`); onClose(); setQuery(""); }}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50 text-sm text-slate-700"
                >
                  {c.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
