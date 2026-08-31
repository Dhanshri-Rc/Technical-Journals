import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react";
import { adminFetchConferences, adminDeleteConference } from "../../services/conferenceService";
import ConfirmDeleteModal from "../../components/admin/ConfirmDeleteModal";
import useDebounce from "../../hooks/useDebounce";

export default function AdminConferencesList() {
  const [conferences, setConferences] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const debouncedSearch = useDebounce(search, 350);

  function load() {
    setLoading(true);
    setError("");
    adminFetchConferences({ page, limit: 10, search: debouncedSearch || undefined })
      .then(({ conferences: rows, pagination: meta }) => {
        setConferences(rows);
        setPagination(meta);
      })
      .catch(() => setError("Unable to load conferences."))
      .finally(() => setLoading(false));
  }

  useEffect(load, [page, debouncedSearch]);

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminDeleteConference(deleteTarget.id);
      setDeleteTarget(null);
      load();
    } catch {
      setError("Failed to delete conference.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-display font-bold text-slate-900">Conferences</h1>
          <p className="text-sm text-slate-500">Manage all conferences on the platform.</p>
        </div>
        <Link to="/admin/conferences/create" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800">
          <Plus className="w-4 h-4" /> Create Conference
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <div className="relative max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by title or code..."
              className="w-full pl-9 pr-3 py-2 rounded-md border border-slate-300 text-sm outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {error && <div className="px-4 py-3 text-sm bg-red-50 text-red-700 border-b border-red-100">{error}</div>}

        {loading ? (
          <div className="flex items-center gap-2 text-slate-500 py-14 justify-center">
            <Loader2 className="w-5 h-5 animate-spin" /> Loading conferences...
          </div>
        ) : conferences.length === 0 ? (
          <div className="py-14 text-center text-slate-500 text-sm">No conferences found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Title</th>
               
                <th className="text-left px-4 py-3 font-semibold">Type</th>
              
                <th className="text-left px-4 py-3 font-semibold">Location</th>
                <th className="text-left px-4 py-3 font-semibold">Status</th>
                <th className="text-right px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {conferences.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800 max-w-xs truncate">{c.title}</td>
                 
                  <td className="px-4 py-3 text-slate-600">{c.conference_type || "—"}</td>
               
                  <td className="px-4 py-3 text-slate-600">{c.location || "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${c.status === "active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/admin/conferences/${c.id}/edit`} className="p-1.5 rounded hover:bg-slate-100 text-slate-500 hover:text-blue-700">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button onClick={() => setDeleteTarget(c)} className="p-1.5 rounded hover:bg-red-50 text-slate-500 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 text-sm text-slate-500">
            <span>Page {pagination.page} of {pagination.totalPages} ({pagination.totalItems} total)</span>
            <div className="flex gap-2">
              <button disabled={!pagination.hasPreviousPage} onClick={() => setPage((p) => p - 1)} className="px-3 py-1.5 rounded border border-slate-300 disabled:opacity-40">Previous</button>
              <button disabled={!pagination.hasNextPage} onClick={() => setPage((p) => p + 1)} className="px-3 py-1.5 rounded border border-slate-300 disabled:opacity-40">Next</button>
            </div>
          </div>
        )}
      </div>

      <ConfirmDeleteModal
        open={!!deleteTarget}
        itemLabel={deleteTarget?.title}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        loading={deleting}
      />
    </div>
  );
}
