import { useEffect, useState } from "react";
import { Loader2, Save, Pencil, Trash2, Plus, X } from "lucide-react";
import {
  adminFetchFooterSettings,
  adminCreateFooterSettings,
  adminUpdateFooterSettings,
  adminDeleteFooterSettings,
} from "../../services/footerService";
import { ApiError } from "../../services/api";
import ConfirmDeleteModal from "../../components/admin/ConfirmDeleteModal";

const EMPTY = {
  address: "",
  email: "",
  phone: "",
  status: "active",
  social: {
    facebook: "",
    linkedin: "",
    twitter: "",
    youtube: "",
  },
};

export default function AdminFooterSettings() {
  const [records, setRecords] = useState([]);
  const [values, setValues] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  function load() {
    setLoading(true);
    setError("");
    adminFetchFooterSettings()
      .then((data) => setRecords(Array.isArray(data) ? data : []))
      .catch(() => setError("Unable to load footer settings."))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  function startCreate() {
    setEditingId(null);
    setValues(EMPTY);
    setError("");
    setFieldErrors([]);
  }

  function startEdit(record) {
    setEditingId(record.id);
    setValues({
      ...EMPTY,
      ...record,
      social: { ...EMPTY.social, ...(record.social || {}) },
    });
    setError("");
    setFieldErrors([]);
  }

  function onChange(e) {
    const { name, value } = e.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function onSocialChange(e) {
    const { name, value } = e.target;
    setValues((current) => ({
      ...current,
      social: { ...current.social, [name]: value },
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setFieldErrors([]);

    try {
      if (editingId) await adminUpdateFooterSettings(editingId, values);
      else await adminCreateFooterSettings(values);
      setEditingId(null);
      setValues(EMPTY);
      load();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
        setFieldErrors(err.errors || []);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminDeleteFooterSettings(deleteTarget.id);
      if (editingId === deleteTarget.id) startCreate();
      setDeleteTarget(null);
      load();
    } catch {
      setError("Failed to delete footer settings.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-display font-bold text-slate-900">Footer Settings</h1>
          <p className="text-sm text-slate-500">Manage footer contact details and social media links.</p>
        </div>
        <button
          type="button"
          onClick={startCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800"
        >
          <Plus className="w-4 h-4" /> Add Settings
        </button>
      </div>

      {error && (
        <div className="mb-4 text-sm bg-red-50 border border-red-200 text-red-700 rounded-md px-4 py-3">
          <p className="font-medium">{error}</p>
          {fieldErrors.length > 0 && (
            <ul className="list-disc list-inside mt-1">
              {fieldErrors.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          )}
        </div>
      )}

      <div className="grid xl:grid-cols-[1fr_1.1fr] gap-6 items-start">
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200">
            <h2 className="text-sm font-semibold text-slate-800">Saved Footer Settings</h2>
          </div>

          {loading ? (
            <div className="flex items-center gap-2 text-slate-500 py-14 justify-center">
              <Loader2 className="w-5 h-5 animate-spin" /> Loading settings...
            </div>
          ) : records.length === 0 ? (
            <div className="py-14 text-center text-slate-500 text-sm">No footer settings found.</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {records.map((record) => (
                <div key={record.id} className="p-4 hover:bg-slate-50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${record.status === "active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                          {record.status}
                        </span>
                        <span className="text-xs text-slate-400">ID #{record.id}</span>
                      </div>
                      <p className="text-sm font-medium text-slate-800 break-words">{record.email}</p>
                      <p className="text-xs text-slate-500 mt-1 break-words">{record.phone}</p>
                      <p className="text-xs text-slate-500 mt-1 break-words line-clamp-2">{record.address}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button type="button" onClick={() => startEdit(record)} className="p-1.5 rounded hover:bg-slate-100 text-slate-500 hover:text-blue-700" aria-label="Edit footer settings">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => setDeleteTarget(record)} className="p-1.5 rounded hover:bg-red-50 text-slate-500 hover:text-red-600" aria-label="Delete footer settings">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={onSubmit} className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-slate-900">
              {editingId ? `Edit Footer Settings #${editingId}` : "Add Footer Settings"}
            </h2>
            {editingId && (
              <button type="button" onClick={startCreate} className="p-1.5 rounded hover:bg-slate-100 text-slate-500" aria-label="Cancel edit">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <Field label="Address" required>
            <textarea name="address" value={values.address} onChange={onChange} rows={3} required className={inputClass} />
          </Field>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Email" required>
              <input type="email" name="email" value={values.email} onChange={onChange} required className={inputClass} />
            </Field>
            <Field label="Phone" required>
              <input name="phone" value={values.phone} onChange={onChange} required className={inputClass} />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Facebook URL"><input name="facebook" value={values.social.facebook} onChange={onSocialChange} className={inputClass} /></Field>
            <Field label="LinkedIn URL"><input name="linkedin" value={values.social.linkedin} onChange={onSocialChange} className={inputClass} /></Field>
            <Field label="Twitter / X URL"><input name="twitter" value={values.social.twitter} onChange={onSocialChange} className={inputClass} /></Field>
            <Field label="YouTube URL"><input name="youtube" value={values.social.youtube} onChange={onSocialChange} className={inputClass} /></Field>
          </div>

          <Field label="Status">
            <select name="status" value={values.status} onChange={onChange} className={inputClass}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </Field>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            {editingId && (
              <button type="button" onClick={startCreate} className="px-4 py-2 rounded-md text-sm font-semibold text-slate-600 hover:bg-slate-100">
                Cancel
              </button>
            )}
            <button type="submit" disabled={saving} className="inline-flex items-center gap-1.5 px-5 py-2 rounded-md bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 disabled:opacity-60">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {editingId ? "Save Changes" : "Add Settings"}
            </button>
          </div>
        </form>
      </div>

      <ConfirmDeleteModal
        open={!!deleteTarget}
        itemLabel={deleteTarget?.email || "footer settings"}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        loading={deleting}
      />
    </div>
  );
}

const inputClass = "w-full px-3 py-2 rounded-md border border-slate-300 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}
