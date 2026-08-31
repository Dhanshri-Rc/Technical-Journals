import { api } from "./api";

export async function fetchDashboardStats() {
  const res = await api.get("/admin/dashboard/stats");
  return res.data;
}
