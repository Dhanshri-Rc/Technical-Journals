import { api } from "./api";

export async function fetchFooterSettings(signal) {
  const res = await api.get("/footer-settings", undefined, signal);
  return res.data;
}

export async function adminFetchFooterSettings() {
  const res = await api.get("/admin/footer-settings");
  return res.data;
}

export async function adminFetchFooterSetting(id) {
  const res = await api.get(`/admin/footer-settings/${id}`);
  return res.data;
}

export async function adminCreateFooterSettings(data) {
  const res = await api.post("/admin/footer-settings", data);
  return res.data;
}

export async function adminUpdateFooterSettings(id, data) {
  const res = await api.put(`/admin/footer-settings/${id}`, data);
  return res.data;
}

export async function adminPatchFooterSettings(id, data) {
  const res = await api.patch(`/admin/footer-settings/${id}`, data);
  return res.data;
}

export async function adminDeleteFooterSettings(id) {
  return api.delete(`/admin/footer-settings/${id}`);
}
