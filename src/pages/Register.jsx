import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import Seo from "../components/common/Seo";
import { Label, ErrorText, Input, Select, SubmitButton } from "../components/forms/FormField";
import { validate, rules } from "../utils/validation";
import { registerUser } from "../services/mockApi";
import logo from "../assets/logos/logo.png";

export default function Register() {
  const [values, setValues] = useState({ name: "", email: "", university: "", role: "", password: "", confirmPassword: "" });
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
      name: [rules.required("Please enter your full name.")],
      email: [rules.required("Please enter your email."), rules.email()],
      university: [rules.required("Please enter your university or institution.")],
      role: [rules.required("Please select your role.")],
      password: [rules.required("Please enter a password."), rules.min(8, "Password must be at least 8 characters.")],
      confirmPassword: [rules.required("Please confirm your password."), rules.matches("password", "Passwords do not match.")],
    });
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    const res = await registerUser(values);
    setLoading(false);
    if (!res.success) {
      setServerError(res.message);
      return;
    }
    navigate("/login");
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-slate-50">
      <Seo title="Register" description="Create a Technical Journals account to submit manuscripts, review papers, or host your university's journal." path="/register" noindex />
      <div className="w-full max-w-md bg-white rounded-xl border border-slate-200 p-8">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Technical Journals logo" className="h-12 mb-3" />
          <h1 className="font-display font-bold text-xl text-slate-900">Create Your Account</h1>
          <p className="text-sm text-slate-500 text-center">Join Technical Journals to submit, review, or host research.</p>
        </div>

        {serverError && (
          <div className="mb-4 text-sm bg-amber-50 border border-amber-200 text-amber-800 rounded-md px-3 py-2.5">{serverError}</div>
        )}

        <form onSubmit={onSubmit} noValidate className="space-y-5">
          <div>
            <Label htmlFor="name" required>Full Name</Label>
            <Input id="name" name="name" value={values.name} onChange={onChange} placeholder="Dr. Jane Smith" error={errors.name} />
            <ErrorText id="name-error">{errors.name}</ErrorText>
          </div>
          <div>
            <Label htmlFor="email" required>Email Address</Label>
            <Input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={onChange} placeholder="you@university.edu" error={errors.email} />
            <ErrorText id="email-error">{errors.email}</ErrorText>
          </div>
          <div>
            <Label htmlFor="university" required>University / Institution</Label>
            <Input id="university" name="university" value={values.university} onChange={onChange} placeholder="University of Oxford" error={errors.university} />
            <ErrorText id="university-error">{errors.university}</ErrorText>
          </div>
          <div>
            <Label htmlFor="role" required>I am a...</Label>
            <Select id="role" name="role" value={values.role} onChange={onChange} error={errors.role}>
              <option value="">Select your role</option>
              <option>Author</option>
              <option>Reviewer</option>
              <option>Editor</option>
              <option>University Administrator</option>
            </Select>
            <ErrorText id="role-error">{errors.role}</ErrorText>
          </div>
          <div>
            <Label htmlFor="password" required>Password</Label>
            <div className="relative">
              <Input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" value={values.password} onChange={onChange} placeholder="At least 8 characters" error={errors.password} className="pr-10" />
              <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <ErrorText id="password-error">{errors.password}</ErrorText>
          </div>
          <div>
            <Label htmlFor="confirmPassword" required>Confirm Password</Label>
            <Input id="confirmPassword" name="confirmPassword" type={showPassword ? "text" : "password"} autoComplete="new-password" value={values.confirmPassword} onChange={onChange} placeholder="Re-enter your password" error={errors.confirmPassword} />
            <ErrorText id="confirmPassword-error">{errors.confirmPassword}</ErrorText>
          </div>
          <label className="flex items-start gap-2 text-xs text-slate-600">
            <input type="checkbox" required className="mt-0.5 rounded border-slate-300 text-blue-700 focus:ring-blue-500" />
            I agree to the <Link to="/terms" className="text-blue-700 font-medium">Terms of Use</Link> and <Link to="/privacy-policy" className="text-blue-700 font-medium">Privacy Policy</Link>.
          </label>
          <SubmitButton loading={loading} className="w-full">
            <UserPlus className="w-4 h-4" /> Create Account
          </SubmitButton>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account? <Link to="/login" className="text-blue-700 font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
}
