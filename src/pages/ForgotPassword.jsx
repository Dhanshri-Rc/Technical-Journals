import { useState } from "react";
import { Link } from "react-router-dom";
import { Send, CheckCircle2 } from "lucide-react";
import Seo from "../components/common/Seo";
import { Label, ErrorText, Input, SubmitButton } from "../components/forms/FormField";
import { validate, rules } from "../utils/validation";
import logo from "../assets/logos/logo.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const errs = validate({ email }, { email: [rules.required("Please enter your email."), rules.email()] });
    setError(errs.email || "");
    if (errs.email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setSent(true);
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-slate-50">
      <Seo title="Forgot Password" description="Reset your Technical Journals account password." path="/forgot-password" noindex />
      <div className="w-full max-w-md bg-white rounded-xl border border-slate-200 p-8">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Technical Journals logo" className="h-12 mb-3" />
          <h1 className="font-display font-bold text-xl text-slate-900">Reset Your Password</h1>
          <p className="text-sm text-slate-500 text-center">Enter your email and we'll send you a link to reset your password.</p>
        </div>

        {sent ? (
          <div className="text-center py-6">
            <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <p className="text-sm text-slate-600">If an account exists for <strong>{email}</strong>, a password reset link has been sent.</p>
            <Link to="/login" className="text-sm font-semibold text-blue-700 mt-4 inline-block">Back to Login</Link>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="space-y-5">
            <div>
              <Label htmlFor="email" required>Email Address</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@university.edu" error={error} />
              <ErrorText id="email-error">{error}</ErrorText>
            </div>
            <SubmitButton loading={loading} className="w-full">
              <Send className="w-4 h-4" /> Send Reset Link
            </SubmitButton>
          </form>
        )}

        <p className="text-center text-sm text-slate-500 mt-6">
          Remembered your password? <Link to="/login" className="text-blue-700 font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
}
