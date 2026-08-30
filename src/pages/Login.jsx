import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import Seo from "../components/common/Seo";
import { Label, ErrorText, Input, SubmitButton } from "../components/forms/FormField";
import { validate, rules } from "../utils/validation";
import { loginUser } from "../services/mockApi";
import logo from "../assets/logos/logo.png";

export default function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  function onChange(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setServerError("");
    const errs = validate(values, {
      email: [rules.required("Please enter your email."), rules.email()],
      password: [rules.required("Please enter your password.")],
    });
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    const res = await loginUser(values);
    setLoading(false);
    if (!res.success) {
      setServerError(res.message || "There was an account created with this platform, but demo data resets between sessions. Please register first.");
      return;
    }
    navigate("/");
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-slate-50">
      <Seo title="Login" description="Log in to your Technical Journals account to manage submissions, reviews, and journal activity." path="/login" noindex />
      <div className="w-full max-w-md bg-white rounded-xl border border-slate-200 p-8">
        <div className="flex flex-col items-center mb-6">
          <Link to="/"><img src={logo} alt="Technical Journals logo" className="h-12 mb-3" /></Link>
          <h1 className="font-display font-bold text-xl text-slate-900">Welcome Back</h1>
          <p className="text-sm text-slate-500">Log in to manage your journals and submissions.</p>
        </div>

        {serverError && (
          <div className="mb-4 text-sm bg-amber-50 border border-amber-200 text-amber-800 rounded-md px-3 py-2.5">
            {serverError}
          </div>
        )}

        <form onSubmit={onSubmit} noValidate className="space-y-5">
          <div>
            <Label htmlFor="email" required>Email Address</Label>
            <Input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={onChange} placeholder="you@university.edu" error={errors.email} />
            <ErrorText id="email-error">{errors.email}</ErrorText>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <Label htmlFor="password" required>Password</Label>
              <Link to="/forgot-password" className="text-xs font-medium text-blue-700">Forgot Password?</Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={values.password}
                onChange={onChange}
                placeholder="Enter your password"
                error={errors.password}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <ErrorText id="password-error">{errors.password}</ErrorText>
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" className="rounded border-slate-300 text-blue-700 focus:ring-blue-500" /> Remember me
          </label>
          <SubmitButton loading={loading} className="w-full">
            <LogIn className="w-4 h-4" /> Login
          </SubmitButton>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account? <Link to="/register" className="text-blue-700 font-semibold">Register</Link>
        </p>
      </div>
    </div>
  );
}
