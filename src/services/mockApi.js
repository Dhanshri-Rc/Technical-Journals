/**
 * Frontend-only mock service layer.
 * In production, replace the localStorage read/writes below with real
 * fetch() calls to your backend API. Suggested endpoints are noted inline.
 */

const delay = (ms = 600) => new Promise((res) => setTimeout(res, ms));

function readCollection(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}
function writeCollection(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

export async function submitContactForm(data) {
  await delay();
  // TODO: replace with POST /api/contact
  const items = readCollection("tj_contact_messages");
  items.push({ ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
  writeCollection("tj_contact_messages", items);
  return { success: true };
}

export async function submitNewsletter(email) {
  await delay(400);
  // TODO: replace with POST /api/newsletter
  const items = readCollection("tj_newsletter");
  if (items.includes(email)) return { success: true, alreadySubscribed: true };
  items.push(email);
  writeCollection("tj_newsletter", items);
  return { success: true };
}

export async function loginUser({ email, password }) {
  await delay();
  // TODO: replace with POST /api/auth/login
  const users = readCollection("tj_users");
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return { success: false, message: "Invalid email or password." };
  localStorage.setItem("tj_session", JSON.stringify({ email: user.email, name: user.name }));
  return { success: true, user };
}

export async function registerUser(data) {
  await delay();
  // TODO: replace with POST /api/auth/register
  const users = readCollection("tj_users");
  if (users.some((u) => u.email === data.email)) {
    return { success: false, message: "An account with this email already exists." };
  }
  users.push(data);
  writeCollection("tj_users", users);
  return { success: true };
}

export async function submitManuscript(data) {
  await delay(900);
  // TODO: replace with POST /api/manuscripts (multipart/form-data)
  const items = readCollection("tj_manuscripts");
  const trackingId = "TJ-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  items.push({ ...data, trackingId, status: "Submitted", createdAt: new Date().toISOString() });
  writeCollection("tj_manuscripts", items);
  return { success: true, trackingId };
}

export async function trackManuscript(trackingId) {
  await delay(500);
  // TODO: replace with GET /api/manuscripts/:trackingId
  const items = readCollection("tj_manuscripts");
  const found = items.find((m) => m.trackingId.toLowerCase() === trackingId.trim().toLowerCase());
  return found || null;
}
