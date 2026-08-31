import { api } from "./api";

export async function submitContactForm({ name, email, subject, message }) {
  const res = await api.post("/contact", { name, email, subject, message });
  return res;
}

// ---- Admin ----
export async function adminFetchEnquiries(params = {}) {
  const res = await api.get("/admin/enquiries", params);
  return { enquiries: res.data, pagination: res.pagination };
}

export async function adminFetchEnquiry(id) {
  const res = await api.get(`/admin/enquiries/${id}`);
  return res.data;
}

export async function adminUpdateEnquiryStatus(id, status, adminNotes) {
  const res = await api.patch(`/admin/enquiries/${id}/status`, { status, adminNotes });
  return res.data;
}

export async function adminDeleteEnquiry(id) {
  return api.delete(`/admin/enquiries/${id}`);
}
