import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import {
  adminFetchJournal,
  adminCreateJournal,
  adminUpdateJournal,
} from "../../services/journalService";
import { fetchUniversities } from "../../services/universityService";
import { resolveImageUrl, ApiError } from "../../services/api";

const EMPTY = {
  title: "", short_title: "", description: "", about: "", aims_scope: "",
  subject_area: "", category: "", issn: "", eissn: "", pissn: "",
  indexing: "", frequency: "Quarterly", access_type: "Open Access", language: "English",
  publisher: "", university_id: "", website_url: "", review_type: "",
  status: "active", featured: false,
};

export default function AdminJournalForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [values, setValues] = useState(EMPTY);
  const [universities, setUniversities] = useState([]);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState([]);

  useEffect(() => {
    fetchUniversities({}).then(setUniversities).catch(() => {});
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    adminFetchJournal(id)
      .then((data) => {
        setValues({ ...EMPTY, ...data, featured: !!data.featured, university_id: data.university_id || "" });
        setCoverPreview(resolveImageUrl(data.cover_image));
      })
      .catch(() => setError("Unable to load this journal."))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setValues((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
  }

  function onCoverChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  }

async function onSubmit(e) {
  e.preventDefault();

  setSaving(true);
  setError("");
  setFieldErrors([]);

  try {
    // Normalize values before sending to backend
    const payload = {
      ...values,

      // Empty selection stays "", backend will convert it to NULL
      university_id:
        values.university_id === ""
          ? ""
          : Number(values.university_id),

      // Normalize checkbox
      featured: values.featured ? 1 : 0,
    };

    if (isEdit) {
      await adminUpdateJournal(id, payload, coverFile);
    } else {
      await adminCreateJournal(payload, coverFile);
    }

    navigate("/admin/journals");
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
    <div className="max-w-3xl">
      <Link to="/admin/journals" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Journals
      </Link>
      <h1 className="text-xl font-display font-bold text-slate-900 mb-6">
        {isEdit ? "Edit Journal" : "Create Journal"}
      </h1>

      {error && (
        <div className="mb-4 text-sm bg-red-50 border border-red-200 text-red-700 rounded-md px-4 py-3">
          <p className="font-medium">{error}</p>
          {fieldErrors.length > 0 && (
            <ul className="list-disc list-inside mt-1">
              {fieldErrors.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          )}
        </div>
      )}

      <form onSubmit={onSubmit} className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
        <Field label="Title" required>
          <input name="title" value={values.title} onChange={onChange} required className={inputClass} />
        </Field>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Subject Area"><input name="subject_area" value={values.subject_area || ""} onChange={onChange} className={inputClass} /></Field>
          <Field label="Category"><input name="category" value={values.category || ""} onChange={onChange} className={inputClass} /></Field>
          <Field label="ISSN"><input name="issn" value={values.issn || ""} onChange={onChange} className={inputClass} /></Field>
          <Field label="Indexing (comma separated)"><input name="indexing" value={values.indexing || ""} onChange={onChange} placeholder="Scopus, WoS, UGC" className={inputClass} /></Field>
          <Field label="Frequency">
            <select name="frequency" value={values.frequency || ""} onChange={onChange} className={inputClass}>
              {["Monthly", "Bi-Monthly", "Quarterly", "Semi-Annual", "Annual"].map((f) => <option key={f}>{f}</option>)}
            </select>
          </Field>
          <Field label="Access Type">
            <select name="access_type" value={values.access_type || ""} onChange={onChange} className={inputClass}>
              {["Open Access", "Subscription", "Hybrid"].map((f) => <option key={f}>{f}</option>)}
            </select>
          </Field>
          <Field label="Language">
            <select name="language" value={values.language || ""} onChange={onChange} className={inputClass}>
              {["English", "Hindi", "French", "Spanish"].map((f) => <option key={f}>{f}</option>)}
            </select>
          </Field>
          <Field label="University">
            <select name="university_id" value={values.university_id || ""} onChange={onChange} className={inputClass}>
              <option value="">— None —</option>
              {universities.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          </Field>
          <Field label="Review Type"><input name="review_type" value={values.review_type || ""} onChange={onChange} className={inputClass} /></Field>
          <Field label="Website URL"><input name="website_url" value={values.website_url || ""} onChange={onChange} className={inputClass} /></Field>
        </div>

        <Field label="Description"><textarea name="description" value={values.description || ""} onChange={onChange} rows={2} className={inputClass} /></Field>
        <Field label="About"><textarea name="about" value={values.about || ""} onChange={onChange} rows={3} className={inputClass} /></Field>
        <Field label="Aims & Scope"><textarea name="aims_scope" value={values.aims_scope || ""} onChange={onChange} rows={3} className={inputClass} /></Field>

        <Field label="Cover Image">
          <div className="flex items-center gap-4">
            {coverPreview && <img src={coverPreview} alt="" className="w-16 h-20 object-cover rounded border border-slate-200" />}
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={onCoverChange} className="text-sm" />
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
          <Link to="/admin/journals" className="px-4 py-2 rounded-md text-sm font-semibold text-slate-600 hover:bg-slate-100">Cancel</Link>
          <button type="submit" disabled={saving} className="inline-flex items-center gap-1.5 px-5 py-2 rounded-md bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 disabled:opacity-60">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isEdit ? "Save Changes" : "Create Journal"}
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
