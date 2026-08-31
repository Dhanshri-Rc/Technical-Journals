import { api, setToken, setStoredUser, getStoredUser } from "./api";

export async function registerUser({ name, email, university, professionalRole, password, confirmPassword }) {
  const res = await api.post("/auth/register", { name, email, university, professionalRole, password, confirmPassword });
  return res;
}

export async function loginUser({ email, password, loginAs = "user" }) {
  const res = await api.post("/auth/login", { email, password, loginAs });
  setToken(res.data.token);
  setStoredUser(res.data.user);
  return res.data.user;
}

export async function fetchCurrentUser() {
  const res = await api.get("/auth/me");
  return res.data;
}

export function logoutUser() {
  setToken(null);
  setStoredUser(null);
}

export function getSessionUser() {
  return getStoredUser();
}

export function isAuthenticated() {
  return !!getStoredUser();
}

export function isAdmin() {
  const user = getStoredUser();
  return !!user && user.role === "admin";
}
