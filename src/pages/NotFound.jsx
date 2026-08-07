import { Link } from "react-router-dom";
import { SearchX } from "lucide-react";
import Seo from "../components/common/Seo";

export default function NotFound() {
  return (
    <div className="min-h-[65vh] flex flex-col items-center justify-center text-center px-4 py-24">
      <Seo title="Page Not Found" description="The page you are looking for could not be found." path="/404" noindex />
      <SearchX className="w-14 h-14 text-blue-700 mb-4" />
      <h1 className="font-display font-bold text-5xl text-slate-900 mb-2">404</h1>
      <p className="text-slate-500 max-w-md mb-6">
        Sorry, we couldn't find the page you're looking for. It may have been moved, renamed, or no longer exists.
      </p>
      <div className="flex gap-3">
        <Link to="/" className="px-5 py-2.5 rounded-md bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800">
          Back to Home
        </Link>
        <Link to="/contact" className="px-5 py-2.5 rounded-md border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50">
          Contact Support
        </Link>
      </div>
    </div>
  );
}
