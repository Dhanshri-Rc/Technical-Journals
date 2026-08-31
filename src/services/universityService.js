import { api } from "./api";

export async function fetchUniversities(params = {}, signal) {
  const res = await api.get("/universities", params, signal);
  return res.data;
}

export async function fetchUniversityByIdOrSlug(idOrSlug) {
  const res = await api.get(`/universities/${idOrSlug}`);
  return res.data;
}

// ---- Admin ----
export async function adminFetchUniversities(params = {}) {
  const res = await api.get("/admin/universities", params);
  return { universities: res.data, pagination: res.pagination };
}

export async function adminFetchUniversity(id) {
  const res = await api.get(`/admin/universities/${id}`);
  return res.data;
}

export async function adminCreateUniversity(data, logoFile) {
  const form = buildForm(data, logoFile, "logo");
  const res = await api.postForm("/admin/universities", form);
  return res.data;
}

export async function adminUpdateUniversity(id, data, logoFile) {
  const form = buildForm(data, logoFile, "logo");
  const res = await api.putForm(`/admin/universities/${id}`, form);
  return res.data;
}

export async function adminDeleteUniversity(id) {
  return api.delete(`/admin/universities/${id}`);
}

function buildForm(data, file, fileField) {
  const form = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) form.append(key, value);
  });
  if (file) form.append(fileField, file);
  return form;
}
