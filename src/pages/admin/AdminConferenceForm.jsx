import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import {
  adminFetchConference,
  adminCreateConference,
  adminUpdateConference,
} from "../../services/conferenceService";
import { resolveImageUrl, ApiError } from "../../services/api";

const EMPTY = {
  title: "", code: "", conference_type: "International Conference", subject_area: "",
  organizer: "", description: "", topics: "", start_date: "", end_date: "",
  display_date: "", location: "", city: "", country: "", region: "",
  venue: "", conference_mode: "In-Person", registration_url: "",
  status: "active", featured: false,
};

const REGIONS = ["Asia", "Europe", "North America", "South America", "Africa", "Oceania"];
const TYPES = ["International Conference", "National Conference", "Workshop", "Symposium", "Webinar"];

export default function AdminConferenceForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [values, setValues] = useState(EMPTY);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState([]);

  useEffect(() => {
    if (!isEdit) return;
    adminFetchConference(id)
      .then((data) => {
        setValues({ ...EMPTY, ...data, featured: !!data.featured });
        setImagePreview(resolveImageUrl(data.image));
      })
      .catch(() => setError("Unable to load this conference."))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setValues((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
  }

  function onImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setFieldErrors([]);
    try {
      if (isEdit) {
        await adminUpdateConference(id, values, imageFile);
      } else {
        await adminCreateConference(values, imageFile);
      }
      navigate("/admin/conferences");
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
      <Link to="/admin/conferences" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Conferences
      </Link>
      <h1 className="text-xl font-display font-bold text-slate-900 mb-6">
        {isEdit ? "Edit Conference" : "Create Conference"}
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
        <Field label="Conference Title" required>
          <input name="title" value={values.title} onChange={onChange} required className={inputClass} />
        </Field>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Conference Code"><input name="code" value={values.code || ""} onChange={onChange} placeholder="ICAI 2026" className={inputClass} /></Field>
          <Field label="Conference Type">
            <select name="conference_type" value={values.conference_type || ""} onChange={onChange} className={inputClass}>
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Subject Area"><input name="subject_area" value={values.subject_area || ""} onChange={onChange} className={inputClass} /></Field>
          <Field label="Organizer"><input name="organizer" value={values.organizer || ""} onChange={onChange} className={inputClass} /></Field>
          <Field label="Start Date"><input type="date" name="start_date" value={values.start_date || ""} onChange={onChange} className={inputClass} /></Field>
          <Field label="End Date"><input type="date" name="end_date" value={values.end_date || ""} onChange={onChange} className={inputClass} /></Field>
          <Field label="Display Date Label"><input name="display_date" value={values.display_date || ""} onChange={onChange} placeholder="15 - 17 July, 2026" className={inputClass} /></Field>
          <Field label="Venue"><input name="venue" value={values.venue || ""} onChange={onChange} className={inputClass} /></Field>
          <Field label="City"><input name="city" value={values.city || ""} onChange={onChange} className={inputClass} /></Field>
          <Field label="Country"><input name="country" value={values.country || ""} onChange={onChange} className={inputClass} /></Field>
          <Field label="Region">
            <select name="region" value={values.region || ""} onChange={onChange} className={inputClass}>
              <option value="">— Select —</option>
              {REGIONS.map((r) => <option key={r}>{r}</option>)}
            </select>
          </Field>
          <Field label="Location (display)"><input name="location" value={values.location || ""} onChange={onChange} placeholder="Oxford, United Kingdom" className={inputClass} /></Field>
          <Field label="Registration URL"><input name="registration_url" value={values.registration_url || ""} onChange={onChange} className={inputClass} /></Field>
          <Field label="Mode">
            <select name="conference_mode" value={values.conference_mode || ""} onChange={onChange} className={inputClass}>
              {["In-Person", "Virtual", "Hybrid"].map((m) => <option key={m}>{m}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Description"><textarea name="description" value={values.description || ""} onChange={onChange} rows={3} className={inputClass} /></Field>
        <Field label="Topics (comma separated)"><input name="topics" value={values.topics || ""} onChange={onChange} placeholder="AI, Machine Learning, Robotics" className={inputClass} /></Field>

        <Field label="Conference Image">
          <div className="flex items-center gap-4">
            {imagePreview && <img src={imagePreview} alt="" className="w-24 h-16 object-cover rounded border border-slate-200" />}
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={onImageChange} className="text-sm" />
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
            Featured
          </label>
        </div>

        <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
          <Link to="/admin/conferences" className="px-4 py-2 rounded-md text-sm font-semibold text-slate-600 hover:bg-slate-100">Cancel</Link>
          <button type="submit" disabled={saving} className="inline-flex items-center gap-1.5 px-5 py-2 rounded-md bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 disabled:opacity-60">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isEdit ? "Save Changes" : "Create Conference"}
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
