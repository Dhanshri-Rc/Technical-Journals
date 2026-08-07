export function Label({ htmlFor, required, children }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-700 mb-1.5">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
}

export function ErrorText({ id, children }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="text-xs text-red-600 mt-1.5">
      {children}
    </p>
  );
}

export function Input({ id, error, className = "", ...props }) {
  return (
    <input
      id={id}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`w-full rounded-md border px-3.5 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-blue-200 ${
        error ? "border-red-400 focus:border-red-500" : "border-slate-300 focus:border-blue-600"
      } ${className}`}
      {...props}
    />
  );
}

export function Textarea({ id, error, className = "", ...props }) {
  return (
    <textarea
      id={id}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`w-full rounded-md border px-3.5 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-blue-200 ${
        error ? "border-red-400 focus:border-red-500" : "border-slate-300 focus:border-blue-600"
      } ${className}`}
      {...props}
    />
  );
}

export function Select({ id, error, className = "", children, ...props }) {
  return (
    <select
      id={id}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`w-full rounded-md border px-3.5 py-2.5 text-sm outline-none bg-white transition-colors focus:ring-2 focus:ring-blue-200 ${
        error ? "border-red-400 focus:border-red-500" : "border-slate-300 focus:border-blue-600"
      } ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export function SubmitButton({ loading, children, className = "", ...props }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors ${className}`}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
