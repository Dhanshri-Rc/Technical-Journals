import { api } from "./api";

/* ======================================================
   PUBLIC - SUBMIT MANUSCRIPT
====================================================== */

export async function submitManuscript(
  data,
  manuscriptFile
) {
  const form = new FormData();

  form.append(
    "title",
    data.title.trim()
  );

  form.append(
    "journal_id",
    data.journal
  );

  form.append(
    "author_name",
    data.authorName.trim()
  );

  form.append(
    "email",
    data.email.trim()
  );

  form.append(
    "abstract",
    data.abstract.trim()
  );

  if (manuscriptFile) {
    form.append(
      "manuscript",
      manuscriptFile
    );
  }

  const res = await api.postForm(
    "/manuscripts",
    form
  );

  return res.data;
}

/* ======================================================
   PUBLIC - TRACK MANUSCRIPT
====================================================== */

export async function trackManuscript(
  trackingId
) {
  const cleanId = trackingId
    .trim()
    .toUpperCase();

  const res = await api.get(
    `/manuscripts/track/${encodeURIComponent(
      cleanId
    )}`
  );

  return res.data;
}

/* ======================================================
   ADMIN - GET ALL MANUSCRIPTS
====================================================== */

export async function adminFetchManuscripts(
  params = {}
) {
  const res = await api.get(
    "/admin/manuscripts",
    params
  );

  return {
    manuscripts: res.data || [],
    pagination: res.pagination || null,
  };
}

/* ======================================================
   ADMIN - GET SINGLE MANUSCRIPT
====================================================== */

export async function adminFetchManuscript(
  id
) {
  const res = await api.get(
    `/admin/manuscripts/${id}`
  );

  return res.data;
}

/* ======================================================
   ADMIN - UPDATE MANUSCRIPT STATUS
====================================================== */

export async function adminUpdateManuscriptStatus(
  id,
  status
) {
  const res = await api.patch(
    `/admin/manuscripts/${id}/status`,
    {
      status,
    }
  );

  return res.data;
}

/* ======================================================
   ADMIN - DELETE MANUSCRIPT
====================================================== */

export async function adminDeleteManuscript(
  id
) {
  return api.delete(
    `/admin/manuscripts/${id}`
  );
}

/* ======================================================
   ADMIN - MANUSCRIPT STATISTICS
====================================================== */

export async function adminFetchManuscriptStats() {
  const res = await api.get(
    "/admin/manuscripts/stats"
  );

  return res.data;
}