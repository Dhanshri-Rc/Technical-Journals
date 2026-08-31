import { api } from "./api";

export async function fetchConferences(params = {}, signal) {
  const res = await api.get("/conferences", params, signal);
  return { conferences: res.data, pagination: res.pagination };
}

export async function fetchConferenceFilterOptions() {
  const res = await api.get("/conferences/filter-options");
  return res.data;
}

export async function fetchConferenceByIdOrSlug(idOrSlug) {
  const res = await api.get(`/conferences/${idOrSlug}`);
  return res.data;
}

// ---- Admin ----
export async function adminFetchConferences(params = {}) {
  const res = await api.get("/admin/conferences", params);
  return { conferences: res.data, pagination: res.pagination };
}

export async function adminFetchConference(id) {
  const res = await api.get(`/admin/conferences/${id}`);
  return res.data;
}

export async function adminCreateConference(data, imageFile) {
  const form = buildForm(data, imageFile, "image");
  const res = await api.postForm("/admin/conferences", form);
  return res.data;
}

export async function adminUpdateConference(id, data, imageFile) {
  const form = buildForm(data, imageFile, "image");
  const res = await api.putForm(`/admin/conferences/${id}`, form);
  return res.data;
}

export async function adminDeleteConference(id) {
  return api.delete(`/admin/conferences/${id}`);
}

function buildForm(data, file, fileField) {
  const form = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) form.append(key, value);
  });
  if (file) form.append(fileField, file);
  return form;
}
