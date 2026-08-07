import { useState } from "react";
import { Link } from "react-router-dom";
import { UploadCloud, CheckCircle2, FileText, Copy } from "lucide-react";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import { Label, ErrorText, Input, Select, Textarea, SubmitButton } from "../components/forms/FormField";
import { validate, rules } from "../utils/validation";
import { submitManuscript } from "../services/mockApi";
import networkBg from "../assets/backgrounds/network-bg.jpg";
import { JOURNALS } from "../data/site";

const MAX_FILE_MB = 20;
const ALLOWED_EXT = [".pdf", ".doc", ".docx"];

export default function SubmitManuscript() {
  const [values, setValues] = useState({ title: "", journal: "", authorName: "", email: "", abstract: "" });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  function onChange(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }

  function onFileChange(e) {
    const f = e.target.files?.[0];
    if (!f) return setFile(null);
    const ext = "." + f.name.split(".").pop().toLowerCase();
    if (!ALLOWED_EXT.includes(ext)) {
      setErrors((er) => ({ ...er, file: `Only ${ALLOWED_EXT.join(", ")} files are accepted.` }));
      setFile(null);
      return;
    }
    if (f.size > MAX_FILE_MB * 1024 * 1024) {
      setErrors((er) => ({ ...er, file: `File must be smaller than ${MAX_FILE_MB}MB.` }));
      setFile(null);
      return;
    }
    setErrors((er) => ({ ...er, file: undefined }));
    setFile(f);
  }

  async function onSubmit(e) {
    e.preventDefault();
    const errs = validate(values, {
      title: [rules.required("Please enter the manuscript title.")],
      journal: [rules.required("Please select a journal.")],
      authorName: [rules.required("Please enter the corresponding author's name.")],
      email: [rules.required("Please enter your email."), rules.email()],
      abstract: [rules.required("Please provide an abstract."), rules.min(50, "Abstract should be at least 50 characters.")],
    });
    if (!file) errs.file = "Please attach your manuscript file.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    const res = await submitManuscript({ ...values, fileName: file.name });
    setLoading(false);
    setResult(res);
  }

  if (result?.success) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
        <Seo title="Manuscript Submitted" description="Your manuscript has been submitted successfully." path="/submit-manuscript" noindex />
        <div className="max-w-md text-center bg-white border border-slate-200 rounded-xl p-8">
          <CheckCircle2 className="w-14 h-14 text-green-600 mx-auto mb-4" />
          <h1 className="font-display font-bold text-xl text-slate-900 mb-2">Manuscript Submitted Successfully</h1>
          <p className="text-sm text-slate-500 mb-4">Your submission has been received. Use the tracking ID below to check your status anytime.</p>
          <div className="flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 rounded-md px-4 py-3 mb-6">
            <span className="font-mono font-semibold text-blue-700">{result.trackingId}</span>
            <button onClick={() => navigator.clipboard?.writeText(result.trackingId)} aria-label="Copy tracking ID" className="text-slate-400 hover:text-slate-700">
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-3 justify-center">
            <Link to="/track-manuscript" className="px-5 py-2.5 rounded-md bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800">Track Manuscript</Link>
            <Link to="/" className="px-5 py-2.5 rounded-md border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Seo title="Submit Manuscript" description="Submit your manuscript to a Technical Journals-hosted journal. Follow the guided submission form to upload your paper and author details." path="/submit-manuscript" />
      <PageHero title="Submit Manuscript" subtitle="Submit your original research to one of our peer-reviewed, university-hosted journals." bg={networkBg} />

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
          <form onSubmit={onSubmit} noValidate className="space-y-5">
            <div>
              <Label htmlFor="title" required>Manuscript Title</Label>
              <Input id="title" name="title" value={values.title} onChange={onChange} placeholder="Enter the full title of your manuscript" error={errors.title} />
              <ErrorText id="title-error">{errors.title}</ErrorText>
            </div>
            <div>
              <Label htmlFor="journal" required>Target Journal</Label>
              <Select id="journal" name="journal" value={values.journal} onChange={onChange} error={errors.journal}>
                <option value="">Select a journal</option>
                {JOURNALS.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}
              </Select>
              <ErrorText id="journal-error">{errors.journal}</ErrorText>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="authorName" required>Corresponding Author</Label>
                <Input id="authorName" name="authorName" value={values.authorName} onChange={onChange} placeholder="Full name" error={errors.authorName} />
                <ErrorText id="authorName-error">{errors.authorName}</ErrorText>
              </div>
              <div>
                <Label htmlFor="email" required>Email Address</Label>
                <Input id="email" name="email" type="email" value={values.email} onChange={onChange} placeholder="you@university.edu" error={errors.email} />
                <ErrorText id="email-error">{errors.email}</ErrorText>
              </div>
            </div>
            <div>
              <Label htmlFor="abstract" required>Abstract</Label>
              <Textarea id="abstract" name="abstract" rows={5} value={values.abstract} onChange={onChange} placeholder="Provide a concise summary of your research (min. 50 characters)" error={errors.abstract} />
              <ErrorText id="abstract-error">{errors.abstract}</ErrorText>
            </div>
            <div>
              <Label htmlFor="file" required>Manuscript File</Label>
              <label
                htmlFor="file"
                className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg py-8 cursor-pointer transition-colors ${
                  errors.file ? "border-red-300 bg-red-50" : "border-slate-300 hover:border-blue-400 hover:bg-blue-50/40"
                }`}
              >
                {file ? (
                  <>
                    <FileText className="w-8 h-8 text-blue-700" />
                    <span className="text-sm text-slate-700 font-medium">{file.name}</span>
                    <span className="text-xs text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-8 h-8 text-slate-400" />
                    <span className="text-sm text-slate-500">Click to upload or drag and drop</span>
                    <span className="text-xs text-slate-400">PDF, DOC, or DOCX (max {MAX_FILE_MB}MB)</span>
                  </>
                )}
                <input id="file" type="file" accept=".pdf,.doc,.docx" onChange={onFileChange} className="sr-only" />
              </label>
              <ErrorText id="file-error">{errors.file}</ErrorText>
            </div>
            <SubmitButton loading={loading} className="w-full">
              <UploadCloud className="w-4 h-4" /> Submit Manuscript
            </SubmitButton>
            <p className="text-xs text-slate-400 text-center">
              By submitting, you confirm this work is original and complies with our{" "}
              <Link to="/publication-ethics" className="text-blue-700">Publication Ethics</Link> policy.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
