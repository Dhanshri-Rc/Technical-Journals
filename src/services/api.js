/**
 * Central API client for the Technical Journals backend.
 * Talks to the Node/Express/MongoDB API in /backend.
 */

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api").replace(/\/$/, "");

// Origin without the trailing /api — used to resolve uploaded image paths like /uploads/...
export const API_ORIGIN = BASE_URL.replace(/\/api$/, "");

export function resolveImageUrl(path) {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_ORIGIN}${path.startsWith("/") ? "" : "/"}${path}`;
}

function getToken() {
  return localStorage.getItem("tj_token");
}

export function setToken(token) {
  if (token) localStorage.setItem("tj_token", token);
  else localStorage.removeItem("tj_token");
}

export function setStoredUser(user) {
  if (user) localStorage.setItem("tj_user", JSON.stringify(user));
  else localStorage.removeItem("tj_user");
}

export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("tj_user") || "null");
  } catch {
    return null;
  }
}

class ApiError extends Error {
  constructor(message, status, errors) {
    super(message);
    this.status = status;
    this.errors = errors || [];
  }
}

async function request(path, { method = "GET", body, params, isForm = false, signal } = {}) {
  let url = `${BASE_URL}${path}`;

  if (params) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") query.set(key, value);
    });
    const qs = query.toString();
    if (qs) url += `?${qs}`;
  }

  const headers = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (!isForm && body !== undefined) headers["Content-Type"] = "application/json";

  let res;
  try {
    res = await fetch(url, {
      method,
      headers,
      body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
      signal,
    });
  } catch (err) {
    if (err.name === "AbortError") throw err;
    throw new ApiError("Unable to reach the server. Please check your connection.", 0);
  }

  let json = null;
  try {
    json = await res.json();
  } catch {
    // no body
  }

  if (!res.ok || !json || json.success === false) {
    const message = json?.message || `Request failed with status ${res.status}`;
    throw new ApiError(message, res.status, json?.errors);
  }

  return json;
}

export const api = {
  get: (path, params, signal) => request(path, { method: "GET", params, signal }),
  post: (path, body) => request(path, { method: "POST", body }),
  put: (path, body) => request(path, { method: "PUT", body }),
  patch: (path, body) => request(path, { method: "PATCH", body }),
  delete: (path) => request(path, { method: "DELETE" }),
  postForm: (path, formData) => request(path, { method: "POST", body: formData, isForm: true }),
  putForm: (path, formData) => request(path, { method: "PUT", body: formData, isForm: true }),
};

export { ApiError };
