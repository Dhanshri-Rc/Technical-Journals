export default function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center" role="status" aria-live="polite">
      <span className="w-10 h-10 border-4 border-blue-100 border-t-blue-700 rounded-full animate-spin" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
