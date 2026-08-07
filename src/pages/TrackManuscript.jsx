import { useState } from "react";
import { Search, FileText, Clock, CheckCircle2, XCircle } from "lucide-react";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import { Label, ErrorText, Input, SubmitButton } from "../components/forms/FormField";
import { trackManuscript } from "../services/mockApi";
import networkBg from "../assets/backgrounds/network-bg.jpg";

const STATUS_STYLES = {
  Submitted: { icon: Clock, color: "text-blue-700 bg-blue-50" },
  "Under Review": { icon: FileText, color: "text-orange-700 bg-orange-50" },
  Accepted: { icon: CheckCircle2, color: "text-green-700 bg-green-50" },
  Rejected: { icon: XCircle, color: "text-red-700 bg-red-50" },
};

export default function TrackManuscript() {
  const [trackingId, setTrackingId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(undefined);

  async function onSubmit(e) {
    e.preventDefault();
    if (!trackingId.trim()) {
      setError("Please enter your manuscript tracking ID.");
      return;
    }
    setError("");
    setLoading(true);
    const found = await trackManuscript(trackingId);
    setLoading(false);
    setResult(found);
  }

  const StatusIcon = result ? STATUS_STYLES[result.status]?.icon || Clock : null;

  return (
    <>
      <Seo title="Track Manuscript" description="Track the status of your manuscript submission to a Technical Journals-hosted journal using your tracking ID." path="/track-manuscript" />
      <PageHero title="Track Your Manuscript" subtitle="Enter your tracking ID to check the current status of your submission." bg={networkBg} />

      <section className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
          <form onSubmit={onSubmit} noValidate className="flex flex-col sm:flex-row gap-3 items-start">
            <div className="flex-1 w-full">
              <Label htmlFor="trackingId" required>Manuscript Tracking ID</Label>
              <Input id="trackingId" value={trackingId} onChange={(e) => setTrackingId(e.target.value)} placeholder="e.g. TJ-AB12CD" error={error} />
              <ErrorText id="trackingId-error">{error}</ErrorText>
            </div>
            <SubmitButton loading={loading} className="mt-0 sm:mt-6 w-full sm:w-auto">
              <Search className="w-4 h-4" /> Track
            </SubmitButton>
          </form>

          {result === null && (
            <div className="mt-6 text-sm bg-amber-50 border border-amber-200 text-amber-800 rounded-md px-4 py-3">
              No manuscript found for tracking ID "{trackingId}". Please double-check the ID and try again, or submit a manuscript first via the Submit Manuscript page.
            </div>
          )}

          {result && (
            <div className="mt-6 border-t border-slate-100 pt-6">
              <div className="flex items-start gap-3 mb-4">
                <span className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${STATUS_STYLES[result.status]?.color || "bg-slate-100 text-slate-600"}`}>
                  <StatusIcon className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="font-semibold text-slate-900">{result.title}</h2>
                  <p className="text-xs text-slate-500">Tracking ID: {result.trackingId}</p>
                </div>
              </div>
              <dl className="grid sm:grid-cols-2 gap-4 text-sm">
                <div><dt className="text-slate-400 text-xs">Status</dt><dd className="font-medium text-slate-800">{result.status}</dd></div>
                <div><dt className="text-slate-400 text-xs">Corresponding Author</dt><dd className="font-medium text-slate-800">{result.authorName}</dd></div>
                <div><dt className="text-slate-400 text-xs">Submitted On</dt><dd className="font-medium text-slate-800">{new Date(result.createdAt).toLocaleDateString()}</dd></div>
                <div><dt className="text-slate-400 text-xs">Target Journal</dt><dd className="font-medium text-slate-800">{result.journal}</dd></div>
              </dl>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
