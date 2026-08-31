import { api } from "./api";

export async function fetchJournals(params = {}, signal) {
  const res = await api.get("/journals", params, signal);
  return { journals: res.data, pagination: res.pagination };
}

export async function fetchFeaturedJournals(limit = 10) {
  const res = await api.get("/journals/featured", { limit });
  return res.data;
}

export async function fetchJournalFilterOptions() {
  const res = await api.get("/journals/filter-options");
  return res.data;
}

export async function fetchJournalByIdOrSlug(idOrSlug) {
  const res = await api.get(`/journals/${idOrSlug}`);
  return res.data;
}

// ---- Admin ----
export async function adminFetchJournals(params = {}) {
  const res = await api.get("/admin/journals", params);
  return { journals: res.data, pagination: res.pagination };
}

export async function adminFetchJournal(id) {
  const res = await api.get(`/admin/journals/${id}`);
  return res.data;
}

export async function adminCreateJournal(data, coverFile) {
  const form = buildForm(data, coverFile, "cover_image");
  const res = await api.postForm("/admin/journals", form);
  return res.data;
}

export async function adminUpdateJournal(id, data, coverFile) {
  const form = buildForm(data, coverFile, "cover_image");
  const res = await api.putForm(`/admin/journals/${id}`, form);
  return res.data;
}

export async function adminDeleteJournal(id) {
  return api.delete(`/admin/journals/${id}`);
}

function buildForm(data, file, fileField) {
  const form = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) form.append(key, value);
  });
  if (file) form.append(fileField, file);
  return form;
}
