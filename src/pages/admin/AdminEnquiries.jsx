import { useEffect, useState } from "react";
import { Loader2, Trash2, Eye, X } from "lucide-react";
import {
  adminFetchEnquiries,
  adminUpdateEnquiryStatus,
  adminDeleteEnquiry,
} from "../../services/contactService";
import ConfirmDeleteModal from "../../components/admin/ConfirmDeleteModal";

const STATUS_STYLES = {
  new: "bg-blue-100 text-blue-700",
  read: "bg-slate-100 text-slate-600",
  replied: "bg-green-100 text-green-700",
  closed: "bg-amber-100 text-amber-700",
};

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  function load() {
    setLoading(true);
    setError("");
    adminFetchEnquiries({ page, limit: 10, status: statusFilter || undefined })
      .then(({ enquiries: rows, pagination: meta }) => {
        setEnquiries(rows);
        setPagination(meta);
      })
      .catch(() => setError("Unable to load enquiries."))
      .finally(() => setLoading(false));
  }

  useEffect(load, [page, statusFilter]);

  async function updateStatus(id, status) {
    await adminUpdateEnquiryStatus(id, status);
    load();
    if (selected?.id === id) setSelected((s) => ({ ...s, status }));
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminDeleteEnquiry(deleteTarget.id);
      setDeleteTarget(null);
      setSelected(null);
      load();
    } catch {
      setError("Failed to delete enquiry.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-display font-bold text-slate-900">Enquiries</h1>
        <p className="text-sm text-slate-500">Messages submitted through the Contact Us form.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 rounded-md border border-slate-300 text-sm outline-none focus:border-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {error && <div className="px-4 py-3 text-sm bg-red-50 text-red-700 border-b border-red-100">{error}</div>}

        {loading ? (
          <div className="flex items-center gap-2 text-slate-500 py-14 justify-center">
            <Loader2 className="w-5 h-5 animate-spin" /> Loading enquiries...
          </div>
        ) : enquiries.length === 0 ? (
          <div className="py-14 text-center text-slate-500 text-sm">No enquiries found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Name</th>
                <th className="text-left px-4 py-3 font-semibold">Email</th>
                <th className="text-left px-4 py-3 font-semibold">Subject</th>
                <th className="text-left px-4 py-3 font-semibold">Date</th>
                <th className="text-left px-4 py-3 font-semibold">Status</th>
                <th className="text-right px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {enquiries.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{e.name}</td>
                  <td className="px-4 py-3 text-slate-600">{e.email}</td>
                  <td className="px-4 py-3 text-slate-600 max-w-xs truncate">{e.subject}</td>
                  <td className="px-4 py-3 text-slate-600">{new Date(e.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${STATUS_STYLES[e.status] || "bg-slate-100 text-slate-500"}`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => { setSelected(e); if (e.status === "new") updateStatus(e.id, "read"); }} className="p-1.5 rounded hover:bg-slate-100 text-slate-500 hover:text-blue-700">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeleteTarget(e)} className="p-1.5 rounded hover:bg-red-50 text-slate-500 hover:text-red-600">
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

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold text-slate-900">{selected.subject}</h3>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            <p className="text-sm text-slate-500 mb-1"><strong className="text-slate-700">From:</strong> {selected.name} ({selected.email})</p>
            <p className="text-sm text-slate-500 mb-4"><strong className="text-slate-700">Date:</strong> {new Date(selected.created_at).toLocaleString()}</p>
            <p className="text-sm text-slate-700 whitespace-pre-wrap bg-slate-50 rounded-md p-3 border border-slate-200">{selected.message}</p>

            <div className="mt-5 flex items-center gap-2">
              <span className="text-sm text-slate-500">Mark as:</span>
              {["new", "read", "replied", "closed"].map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(selected.id, s)}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                    selected.status === s ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 text-slate-600 hover:border-blue-400"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <ConfirmDeleteModal
        open={!!deleteTarget}
        itemLabel={deleteTarget?.subject}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        loading={deleting}
      />
    </div>
  );
}
