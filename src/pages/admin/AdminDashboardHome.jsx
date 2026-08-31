import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, CalendarDays, Landmark, Mail, Loader2 } from "lucide-react";
import { fetchDashboardStats } from "../../services/dashboardService";

const CARDS = [
  { key: "totalJournals", label: "Total Journals", icon: BookOpen, color: "bg-blue-50 text-blue-700", link: "/admin/journals" },
  { key: "totalConferences", label: "Total Conferences", icon: CalendarDays, color: "bg-purple-50 text-purple-700", link: "/admin/conferences" },
  { key: "totalUniversities", label: "Total Universities", icon: Landmark, color: "bg-green-50 text-green-700", link: "/admin/universities" },
  { key: "newEnquiries", label: "New Enquiries", icon: Mail, color: "bg-amber-50 text-amber-700", link: "/admin/enquiries" },
];

export default function AdminDashboardHome() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardStats()
      .then(setStats)
      .catch(() => setError("Unable to load dashboard stats."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-display font-bold text-slate-900 mb-1">Dashboard</h1>
      <p className="text-sm text-slate-500 mb-6">Overview of your Technical Journals platform.</p>

      {loading ? (
        <div className="flex items-center gap-2 text-slate-500 py-10">
          <Loader2 className="w-5 h-5 animate-spin" /> Loading stats...
        </div>
      ) : error ? (
        <div className="text-sm bg-red-50 border border-red-200 text-red-700 rounded-md px-4 py-3">{error}</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CARDS.map(({ key, label, icon: Icon, color, link }) => (
            <Link
              key={key}
              to={link}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:border-blue-300 hover:shadow-sm transition"
            >
              <span className={`inline-flex w-10 h-10 rounded-lg items-center justify-center mb-3 ${color}`}>
                <Icon className="w-5 h-5" />
              </span>
              <p className="text-2xl font-bold text-slate-900">{stats?.[key] ?? 0}</p>
              <p className="text-sm text-slate-500 mt-0.5">{label}</p>
            </Link>
          ))}
        </div>
      )}

      {!loading && !error && (
        <div className="mt-6 bg-white rounded-xl border border-slate-200 p-5 text-sm text-slate-600">
          <p>
            <strong>{stats?.totalUsers ?? 0}</strong> registered users ·{" "}
            <strong>{stats?.totalEnquiries ?? 0}</strong> total enquiries received.
          </p>
        </div>
      )}
    </div>
  );
}
