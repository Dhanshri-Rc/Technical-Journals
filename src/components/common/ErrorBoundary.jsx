import { Component } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught:", error, info);
    }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-24">
          <AlertTriangle className="w-12 h-12 text-orange-500 mb-4" />
          <h1 className="font-display font-bold text-2xl text-slate-900 mb-2">Something went wrong</h1>
          <p className="text-slate-500 max-w-md mb-6">
            We hit an unexpected error while loading this page. Please try returning home.
          </p>
          <Link to="/" className="px-5 py-2.5 rounded-md bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800">
            Back to Home
          </Link>
        </div>
      );
    }
    return this.props.children;
  }
}
