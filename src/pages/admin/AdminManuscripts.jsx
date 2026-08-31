import { useEffect, useState } from "react";
import {
  Search,
  Eye,
  Trash2,
  Download,
  X,
  Loader2,
  FileText,
  RefreshCw,
} from "lucide-react";

import {
  adminFetchManuscripts,
  adminFetchManuscript,
  adminUpdateManuscriptStatus,
  adminDeleteManuscript,
} from "../../services/manuscriptService";

/* ======================================================
   STATUS OPTIONS
====================================================== */

const STATUS_OPTIONS = [
  {
    value: "submitted",
    label: "Submitted",
  },
  {
    value: "under_review",
    label: "Under Review",
  },
  {
    value: "revision_required",
    label: "Revision Required",
  },
  {
    value: "accepted",
    label: "Accepted",
  },
  {
    value: "rejected",
    label: "Rejected",
  },
];

/* ======================================================
   STATUS COLORS
====================================================== */

const STATUS_STYLES = {
  submitted:
    "bg-blue-50 text-blue-700 border-blue-200",

  under_review:
    "bg-orange-50 text-orange-700 border-orange-200",

  revision_required:
    "bg-amber-50 text-amber-700 border-amber-200",

  accepted:
    "bg-green-50 text-green-700 border-green-200",

  rejected:
    "bg-red-50 text-red-700 border-red-200",
};

export default function AdminManuscripts() {
  /* ====================================================
     STATES
  ==================================================== */

  const [manuscripts, setManuscripts] =
    useState([]);

  const [pagination, setPagination] =
    useState(null);

  const [page, setPage] = useState(1);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [
    selectedManuscript,
    setSelectedManuscript,
  ] = useState(null);

  const [
    detailsLoading,
    setDetailsLoading,
  ] = useState(false);

  const [
    updatingStatusId,
    setUpdatingStatusId,
  ] = useState(null);

  const [
    deletingId,
    setDeletingId,
  ] = useState(null);

  /* ====================================================
     FETCH MANUSCRIPTS
  ==================================================== */

  async function loadManuscripts() {
    try {
      setLoading(true);
      setError("");

      const response =
        await adminFetchManuscripts({
          page,
          limit: 10,
          search:
            search.trim() || undefined,
          status:
            status || undefined,
        });

      setManuscripts(
        response.manuscripts || []
      );

      setPagination(
        response.pagination || null
      );
    } catch (err) {
      console.error(
        "Admin manuscripts error:",
        err
      );

      setError(
        err?.message ||
          "Unable to load manuscript submissions."
      );
    } finally {
      setLoading(false);
    }
  }

  /* ====================================================
     LOAD WHEN FILTER/PAGE CHANGES
  ==================================================== */

  useEffect(() => {
    const timer = setTimeout(() => {
      loadManuscripts();
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [page, search, status]);

  /* ====================================================
     OPEN MANUSCRIPT DETAILS
  ==================================================== */

  async function openDetails(id) {
    try {
      setDetailsLoading(true);
      setError("");

      const manuscript =
        await adminFetchManuscript(id);

      setSelectedManuscript(
        manuscript
      );
    } catch (err) {
      console.error(
        "Manuscript detail error:",
        err
      );

      setError(
        err?.message ||
          "Unable to load manuscript details."
      );
    } finally {
      setDetailsLoading(false);
    }
  }

  /* ====================================================
     UPDATE STATUS
  ==================================================== */

  async function updateStatus(
    manuscript,
    newStatus
  ) {
    if (
      manuscript.status === newStatus
    ) {
      return;
    }

    try {
      setUpdatingStatusId(
        manuscript.id
      );

      setError("");

      const updated =
        await adminUpdateManuscriptStatus(
          manuscript.id,
          newStatus
        );

      /* Update table */

      setManuscripts((current) =>
        current.map((item) =>
          item.id === manuscript.id
            ? {
                ...item,
                status:
                  updated?.status ||
                  newStatus,
                updated_at:
                  updated?.updated_at ||
                  item.updated_at,
              }
            : item
        )
      );

      /* Update opened modal */

      if (
        selectedManuscript?.id ===
        manuscript.id
      ) {
        setSelectedManuscript(
          (current) => ({
            ...current,
            ...updated,
            status:
              updated?.status ||
              newStatus,
          })
        );
      }
    } catch (err) {
      console.error(
        "Status update error:",
        err
      );

      setError(
        err?.message ||
          "Unable to update manuscript status."
      );

      loadManuscripts();
    } finally {
      setUpdatingStatusId(null);
    }
  }

  /* ====================================================
     DELETE MANUSCRIPT
  ==================================================== */

  async function deleteManuscript(
    id
  ) {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this manuscript submission?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");

      await adminDeleteManuscript(id);

      if (
        selectedManuscript?.id === id
      ) {
        setSelectedManuscript(null);
      }

      await loadManuscripts();
    } catch (err) {
      console.error(
        "Delete manuscript error:",
        err
      );

      setError(
        err?.message ||
          "Unable to delete manuscript."
      );
    } finally {
      setDeletingId(null);
    }
  }

  /* ====================================================
     DATE FORMAT
  ==================================================== */

  function formatDate(date) {
    if (!date) {
      return "—";
    }

    const parsed =
      new Date(date);

    if (
      Number.isNaN(
        parsed.getTime()
      )
    ) {
      return "—";
    }

    return parsed.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  }

  /* ====================================================
     STATUS LABEL
  ==================================================== */

  function getStatusLabel(value) {
    return (
      STATUS_OPTIONS.find(
        (item) =>
          item.value === value
      )?.label || value
    );
  }

  /* ====================================================
     FILE URL
  ==================================================== */

  function getFileUrl(fileUrl) {
    if (!fileUrl) {
      return "#";
    }

    if (
      fileUrl.startsWith(
        "http://"
      ) ||
      fileUrl.startsWith(
        "https://"
      )
    ) {
      return fileUrl;
    }

    const apiUrl =
      import.meta.env
        .VITE_API_URL ||
      "http://localhost:5000/api";

    const backendUrl =
      apiUrl.replace(
        /\/api\/?$/,
        ""
      );

    return `${backendUrl}${fileUrl}`;
  }

  /* ====================================================
     PAGINATION VALUES
  ==================================================== */

  const totalPages =
    pagination?.totalPages ||
    pagination?.pages ||
    1;

  /* ====================================================
     UI
  ==================================================== */

  return (
    <div className="space-y-6">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-[22px] font-bold text-slate-900">
            Manuscript Submissions
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View submitted manuscripts,
            review details and update
            publication status.
          </p>
        </div>

        <button
          type="button"
          onClick={loadManuscripts}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-lg
            border
            border-slate-300
            bg-white
            px-4
            py-2.5
            text-sm
            font-medium
            text-slate-700
            transition
            hover:bg-slate-50
          "
        >
          <RefreshCw className="h-4 w-4" />

          Refresh
        </button>
      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* =================================================
          FILTER BAR
      ================================================= */}

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_220px]">

          {/* Search */}

          <div className="relative">
            <Search
              size={17}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(
                  e.target.value
                );

                setPage(1);
              }}
              placeholder="Search tracking ID, title, author, email or journal..."
              className="
                w-full
                rounded-lg
                border
                border-slate-300
                bg-white
                py-2.5
                pl-10
                pr-4
                text-sm
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
            />
          </div>

          {/* Status filter */}

          <select
            value={status}
            onChange={(e) => {
              setStatus(
                e.target.value
              );

              setPage(1);
            }}
            className="
              rounded-lg
              border
              border-slate-300
              bg-white
              px-3
              py-2.5
              text-sm
              text-slate-700
              outline-none
              focus:border-blue-500
            "
          >
            <option value="">
              All Status
            </option>

            {STATUS_OPTIONS.map(
              (item) => (
                <option
                  key={
                    item.value
                  }
                  value={
                    item.value
                  }
                >
                  {item.label}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      {/* =================================================
          TABLE
      ================================================= */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px]">

            {/* Header */}

            <thead className="border-b border-slate-200 bg-slate-50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">

                <th className="px-5 py-4">
                  Tracking ID
                </th>

                <th className="px-5 py-4">
                  Manuscript
                </th>

                <th className="px-5 py-4">
                  Journal
                </th>

                <th className="px-5 py-4">
                  Author
                </th>

                <th className="px-5 py-4">
                  Submitted
                </th>

                <th className="px-5 py-4">
                  Status
                </th>

                <th className="px-5 py-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Body */}

            <tbody className="divide-y divide-slate-100">

              {/* Loading */}

              {loading && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-16"
                  >
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                      <Loader2 className="h-5 w-5 animate-spin text-blue-700" />

                      Loading manuscript
                      submissions...
                    </div>
                  </td>
                </tr>
              )}

              {/* Empty */}

              {!loading &&
                manuscripts.length ===
                  0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-16 text-center"
                    >
                      <FileText className="mx-auto mb-3 h-9 w-9 text-slate-300" />

                      <p className="text-sm font-medium text-slate-700">
                        No manuscript
                        submissions found
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        New manuscript
                        submissions will
                        appear here.
                      </p>
                    </td>
                  </tr>
                )}

              {/* Records */}

              {!loading &&
                manuscripts.map(
                  (manuscript) => (
                    <tr
                      key={
                        manuscript.id
                      }
                      className="transition hover:bg-slate-50/70"
                    >

                      {/* Tracking */}

                      <td className="px-5 py-4">
                        <span className="font-mono text-xs font-semibold text-blue-700">
                          {
                            manuscript.tracking_id
                          }
                        </span>
                      </td>

                      {/* Manuscript */}

                      <td className="max-w-[260px] px-5 py-4">
                        <p
                          title={
                            manuscript.title
                          }
                          className="truncate text-sm font-semibold text-slate-800"
                        >
                          {
                            manuscript.title
                          }
                        </p>

                        {manuscript.file_name && (
                          <p className="mt-1 truncate text-xs text-slate-400">
                            {
                              manuscript.file_name
                            }
                          </p>
                        )}
                      </td>

                      {/* Journal */}

                      <td className="max-w-[200px] px-5 py-4">
                        <p
                          title={
                            manuscript.journal_title
                          }
                          className="truncate text-sm text-slate-600"
                        >
                          {manuscript.journal_title ||
                            "—"}
                        </p>
                      </td>

                      {/* Author */}

                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-slate-700">
                          {
                            manuscript.author_name
                          }
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {
                            manuscript.email
                          }
                        </p>
                      </td>

                      {/* Submitted */}

                      <td className="px-5 py-4 text-sm text-slate-500">
                        {formatDate(
                          manuscript.submitted_at
                        )}
                      </td>

                      {/* Status */}

                      <td className="px-5 py-4">
                        {updatingStatusId ===
                        manuscript.id ? (
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Loader2 className="h-4 w-4 animate-spin" />

                            Updating...
                          </div>
                        ) : (
                          <select
                            value={
                              manuscript.status
                            }
                            onChange={(e) =>
                              updateStatus(
                                manuscript,
                                e.target
                                  .value
                              )
                            }
                            className={`
                              rounded-full
                              border
                              px-3
                              py-1.5
                              text-xs
                              font-semibold
                              outline-none
                              cursor-pointer

                              ${
                                STATUS_STYLES[
                                  manuscript
                                    .status
                                ] ||
                                "border-slate-200 bg-slate-50 text-slate-600"
                              }
                            `}
                          >
                            {STATUS_OPTIONS.map(
                              (
                                item
                              ) => (
                                <option
                                  key={
                                    item.value
                                  }
                                  value={
                                    item.value
                                  }
                                >
                                  {
                                    item.label
                                  }
                                </option>
                              )
                            )}
                          </select>
                        )}
                      </td>

                      {/* Actions */}

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">

                          {/* View */}

                          <button
                            type="button"
                            onClick={() =>
                              openDetails(
                                manuscript.id
                              )
                            }
                            title="View manuscript"
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-lg
                              text-blue-700
                              transition
                              hover:bg-blue-50
                            "
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          {/* Delete */}

                          <button
                            type="button"
                            onClick={() =>
                              deleteManuscript(
                                manuscript.id
                              )
                            }
                            disabled={
                              deletingId ===
                              manuscript.id
                            }
                            title="Delete manuscript"
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-lg
                              text-red-600
                              transition
                              hover:bg-red-50
                              disabled:opacity-50
                            "
                          >
                            {deletingId ===
                            manuscript.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </div>

        {/* =================================================
            PAGINATION
        ================================================= */}

        {!loading &&
          pagination &&
          totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">

              <p className="text-xs text-slate-500">
                Page {page} of{" "}
                {totalPages}
              </p>

              <div className="flex gap-2">

                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() =>
                    setPage(
                      (current) =>
                        current - 1
                    )
                  }
                  className="
                    rounded-md
                    border
                    border-slate-300
                    px-3
                    py-1.5
                    text-xs
                    font-medium
                    text-slate-700
                    transition
                    hover:bg-slate-50
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  Previous
                </button>

                <button
                  type="button"
                  disabled={
                    page >=
                    totalPages
                  }
                  onClick={() =>
                    setPage(
                      (current) =>
                        current + 1
                    )
                  }
                  className="
                    rounded-md
                    border
                    border-slate-300
                    px-3
                    py-1.5
                    text-xs
                    font-medium
                    text-slate-700
                    transition
                    hover:bg-slate-50
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  Next
                </button>
              </div>
            </div>
          )}
      </div>

      {/* =================================================
          DETAILS LOADING MODAL
      ================================================= */}

      {detailsLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="rounded-xl bg-white px-10 py-12 shadow-xl">
            <Loader2 className="mx-auto h-6 w-6 animate-spin text-blue-700" />

            <p className="mt-3 text-sm text-slate-500">
              Loading manuscript...
            </p>
          </div>
        </div>
      )}

      {/* =================================================
          DETAILS MODAL
      ================================================= */}

      {selectedManuscript &&
        !detailsLoading && (
          <div
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/40
              p-4
            "
          >
            <div
              className="
                max-h-[92vh]
                w-full
                max-w-3xl
                overflow-y-auto
                rounded-2xl
                bg-white
                shadow-2xl
              "
            >

              {/* Modal header */}

              <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white px-6 py-5">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Manuscript Details
                  </h2>

                  <p className="mt-1 font-mono text-xs font-medium text-blue-700">
                    {
                      selectedManuscript.tracking_id
                    }
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedManuscript(
                      null
                    )
                  }
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    text-slate-500
                    transition
                    hover:bg-slate-100
                  "
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal body */}

              <div className="space-y-7 p-6">

                {/* Title */}

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Manuscript Title
                  </p>

                  <h3 className="mt-2 text-base font-semibold leading-6 text-slate-900">
                    {
                      selectedManuscript.title
                    }
                  </h3>
                </div>

                {/* Main details */}

                <div className="grid gap-5 rounded-xl bg-slate-50 p-5 sm:grid-cols-2">

                  <DetailItem
                    label="Target Journal"
                    value={
                      selectedManuscript.journal_title
                    }
                  />

                  <DetailItem
                    label="Corresponding Author"
                    value={
                      selectedManuscript.author_name
                    }
                  />

                  <DetailItem
                    label="Email"
                    value={
                      selectedManuscript.email
                    }
                  />

                  <DetailItem
                    label="Submitted On"
                    value={formatDate(
                      selectedManuscript.submitted_at
                    )}
                  />

                  <DetailItem
                    label="Last Updated"
                    value={formatDate(
                      selectedManuscript.updated_at
                    )}
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Status
                    </p>

                    <select
                      value={
                        selectedManuscript.status
                      }
                      onChange={(e) =>
                        updateStatus(
                          selectedManuscript,
                          e.target
                            .value
                        )
                      }
                      className={`
                        mt-1
                        rounded-full
                        border
                        px-3
                        py-1.5
                        text-xs
                        font-semibold
                        outline-none

                        ${
                          STATUS_STYLES[
                            selectedManuscript
                              .status
                          ] ||
                          "border-slate-200 bg-slate-100 text-slate-600"
                        }
                      `}
                    >
                      {STATUS_OPTIONS.map(
                        (item) => (
                          <option
                            key={
                              item.value
                            }
                            value={
                              item.value
                            }
                          >
                            {
                              item.label
                            }
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>

                {/* Abstract */}

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Abstract
                  </p>

                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                    {
                      selectedManuscript.abstract
                    }
                  </p>
                </div>

                {/* Uploaded file */}

                {selectedManuscript.file_url && (
                  <div className="rounded-xl border border-slate-200 p-5">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                          <FileText className="h-5 w-5" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs text-slate-400">
                            Uploaded
                            Manuscript
                          </p>

                          <p className="truncate text-sm font-medium text-slate-800">
                            {
                              selectedManuscript.file_name
                            }
                          </p>
                        </div>
                      </div>

                      <a
                        href={getFileUrl(
                          selectedManuscript.file_url
                        )}
                        target="_blank"
                        rel="noreferrer"
                        className="
                          inline-flex
                          items-center
                          justify-center
                          gap-2
                          rounded-lg
                          bg-[#07386f]
                          px-4
                          py-2.5
                          text-sm
                          font-semibold
                          text-white
                          transition
                          hover:bg-[#004276]
                        "
                      >
                        <Download className="h-4 w-4" />

                        Open Manuscript
                      </a>
                    </div>
                  </div>
                )}

                {/* Status explanation */}

                <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                  <p className="text-sm font-semibold text-slate-800">
                    Current Status:{" "}
                    {getStatusLabel(
                      selectedManuscript.status
                    )}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    When you change the
                    manuscript status
                    here, the author
                    will see the updated
                    status immediately
                    when using the
                    manuscript tracking
                    page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

/* ======================================================
   DETAIL ITEM
====================================================== */

function DetailItem({
  label,
  value,
}) {
  return (
    <div>
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-medium text-slate-800">
        {value || "—"}
      </p>
    </div>
  );
}