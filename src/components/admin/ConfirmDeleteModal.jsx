import { AlertTriangle } from "lucide-react";

export default function ConfirmDeleteModal({ open, title, itemLabel, onCancel, onConfirm, loading }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
        <div className="flex items-start gap-3">
          <span className="shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </span>
          <div>
            <h3 className="font-semibold text-slate-900">{title || "Delete this item?"}</h3>
            <p className="text-sm text-slate-500 mt-1">
              Are you sure you want to delete {itemLabel ? <strong>{itemLabel}</strong> : "this item"}? This action cannot be undone.
            </p>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 rounded-md text-sm font-semibold text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-md text-sm font-semibold text-white bg-red-600 hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
