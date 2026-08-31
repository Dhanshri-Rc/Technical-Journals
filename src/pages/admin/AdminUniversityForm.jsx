import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import {
  adminFetchUniversity,
  adminCreateUniversity,
  adminUpdateUniversity,
} from "../../services/universityService";
import { resolveImageUrl, ApiError } from "../../services/api";

const EMPTY = {
  name: "", country: "", website_url: "", description: "",
  journals_count: 0, status: "active", display_order: 0, featured: false,
};

export default function AdminUniversityForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [values, setValues] = useState(EMPTY);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState([]);

  useEffect(() => {
    if (!isEdit) return;
    adminFetchUniversity(id)
      .then((data) => {
        setValues({ ...EMPTY, ...data, featured: !!data.featured });
        setLogoPreview(resolveImageUrl(data.logo));
      })
      .catch(() => setError("Unable to load this university."))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setValues((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
  }

  function onLogoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setFieldErrors([]);
    try {
      if (isEdit) {
        await adminUpdateUniversity(id, values, logoFile);
      } else {
        await adminCreateUniversity(values, logoFile);
      }
      navigate("/admin/universities");
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

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-slate-500 py-14 justify-center">
        <Loader2 className="w-5 h-5 animate-spin" /> Loading...
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <Link to="/admin/universities" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Universities
      </Link>
      <h1 className="text-xl font-display font-bold text-slate-900 mb-6">
        {isEdit ? "Edit University" : "Add University"}
      </h1>

      {error && (
        <div className="mb-4 text-sm bg-red-50 border border-red-200 text-red-700 rounded-md px-4 py-3">
          <p className="font-medium">{error}</p>
          {fieldErrors.length > 0 && (
            <ul className="list-disc list-inside mt-1">{fieldErrors.map((e, i) => <li key={i}>{e}</li>)}</ul>
          )}
        </div>
      )}

      <form onSubmit={onSubmit} className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
        <Field label="University Name" required>
          <input name="name" value={values.name} onChange={onChange} required className={inputClass} />
        </Field>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Country"><input name="country" value={values.country || ""} onChange={onChange} className={inputClass} /></Field>
          <Field label="Website URL"><input name="website_url" value={values.website_url || ""} onChange={onChange} className={inputClass} /></Field>
          <Field label="Journals Count"><input type="number" min="0" name="journals_count" value={values.journals_count} onChange={onChange} className={inputClass} /></Field>
          <Field label="Display Order"><input type="number" min="0" name="display_order" value={values.display_order} onChange={onChange} className={inputClass} /></Field>
        </div>

        <Field label="Description"><textarea name="description" value={values.description || ""} onChange={onChange} rows={3} className={inputClass} /></Field>

        <Field label="Logo">
          <div className="flex items-center gap-4">
            {logoPreview && <img src={logoPreview} alt="" className="w-20 h-12 object-contain rounded border border-slate-200 bg-white p-1" />}
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={onLogoChange} className="text-sm" />
          </div>
        </Field>

        <div className="flex items-center gap-6">
          <Field label="Status">
            <select name="status" value={values.status} onChange={onChange} className={inputClass}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </Field>
          <label className="flex items-center gap-2 text-sm text-slate-700 mt-6">
            <input type="checkbox" name="featured" checked={!!values.featured} onChange={onChange} className="rounded border-slate-300" />
            Featured on homepage
          </label>
        </div>

        <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
          <Link to="/admin/universities" className="px-4 py-2 rounded-md text-sm font-semibold text-slate-600 hover:bg-slate-100">Cancel</Link>
          <button type="submit" disabled={saving} className="inline-flex items-center gap-1.5 px-5 py-2 rounded-md bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 disabled:opacity-60">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isEdit ? "Save Changes" : "Add University"}
          </button>
        </div>
      </form>
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
