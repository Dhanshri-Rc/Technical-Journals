import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, ShieldCheck } from "lucide-react";
import Seo from "../components/common/Seo";
import {
  Label,
  ErrorText,
  Input,
  SubmitButton,
} from "../components/forms/FormField";
import { validate, rules } from "../utils/validation";
import { loginUser } from "../services/authService";
import { ApiError } from "../services/api";
import logo from "../assets/logos/logo.png";

export default function Login() {
  // Admin login only
  const loginAs = "admin";

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  function onChange(e) {
    setValues((v) => ({
      ...v,
      [e.target.name]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    setServerError("");

    const errs = validate(values, {
      email: [
        rules.required("Please enter your email."),
        rules.email(),
      ],
      password: [
        rules.required("Please enter your password."),
      ],
    });

    setErrors(errs);

    if (Object.keys(errs).length) return;

    setLoading(true);

    try {
      const user = await loginUser({
        email: values.email,
        password: values.password,
        loginAs,
      });

      setLoading(false);

      navigate(user.role === "admin" ? "/admin" : "/");
    } catch (err) {
      setLoading(false);

      setServerError(
        err instanceof ApiError
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 py-16">

      {/* ================= SEO ================= */}
      <Seo
        title="Admin Login"
        description="Admin login for Technical Journals management dashboard."
        path="/login"
        noindex
      />

      {/* ================= LOGIN CARD ================= */}
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8">

        {/* ================= LOGO & HEADING ================= */}
        <div className="mb-6 flex flex-col items-center">

          <Link to="/">
            <img
              src={logo}
              alt="Technical Journals logo"
              className="mb-3 h-12"
            />
          </Link>

          <h1 className="font-display text-xl font-bold text-slate-900">
            Admin Login
          </h1>

          <p className="mt-1 text-center text-sm text-slate-500">
            Log in to access the Technical Journals admin dashboard.
          </p>

        </div>

       

        {/* ================= SERVER ERROR ================= */}
        {serverError && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-800">
            {serverError}
          </div>
        )}

        {/* ================= LOGIN FORM ================= */}
        <form
          onSubmit={onSubmit}
          noValidate
          className="space-y-5"
        >

          {/* Email */}
          <div>
            <Label
              htmlFor="email"
              required
            >
              Email Address
            </Label>

            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={onChange}
              placeholder="admin@technicaljournals.com"
              error={errors.email}
            />

            <ErrorText id="email-error">
              {errors.email}
            </ErrorText>
          </div>

          {/* Password */}
          <div>

            <div className="mb-1.5 flex items-center justify-between">

              <Label
                htmlFor="password"
                required
              >
                Password
              </Label>

              <Link
                to="/forgot-password"
                className="text-xs font-medium text-blue-700 hover:text-blue-800"
              >
                Forgot Password?
              </Link>

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
                onClick={() =>
                  setShowPassword((v) => !v)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>

            </div>

            <ErrorText id="password-error">
              {errors.password}
            </ErrorText>

          </div>

          {/* Remember Me */}
          <label className="flex items-center gap-2 text-sm text-slate-600">

            <input
              type="checkbox"
              className="rounded border-slate-300 text-blue-700 focus:ring-blue-500"
            />

            Remember me

          </label>

          {/* Login Button */}
          <SubmitButton
            loading={loading}
            className="w-full"
          >
            <LogIn className="h-4 w-4" />
            Login as Admin
          </SubmitButton>

        </form>

      </div>
    </div>
  );
}