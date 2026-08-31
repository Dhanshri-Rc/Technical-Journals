/**
 * Frontend-only mock service layer — kept only for features that are not
 * part of this backend integration (manuscript submission/tracking has no
 * corresponding API in backend/ yet). Auth, contact, journals, conferences,
 * and universities have all been moved to real backend calls — see
 * src/services/authService.js, contactService.js, journalService.js,
 * conferenceService.js, and universityService.js.
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

export async function submitManuscript(data) {
  await delay(900);
  // TODO: replace with POST /api/manuscripts (multipart/form-data) if this feature is built out.
  const items = readCollection("tj_manuscripts");
  const trackingId = "TJ-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  items.push({ ...data, trackingId, status: "Submitted", createdAt: new Date().toISOString() });
  writeCollection("tj_manuscripts", items);
  return { success: true, trackingId };
}

export async function trackManuscript(trackingId) {
  await delay(500);
  // TODO: replace with GET /api/manuscripts/:trackingId if this feature is built out.
  const items = readCollection("tj_manuscripts");
  const found = items.find((m) => m.trackingId.toLowerCase() === trackingId.trim().toLowerCase());
  return found || null;
}
