const { Counter } = require("../db/models");

async function nextId(key) {
  const counter = await Counter.findOneAndUpdate(
    { key },
    { $inc: { seq: 1 } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  ).lean();
  return counter.seq;
}

async function syncCounter(key, value) {
  await Counter.findOneAndUpdate(
    { key },
    { $max: { seq: Number(value) || 0 } },
    { upsert: true, setDefaultsOnInsert: true }
  );
}

function escapeRegex(value = "") {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function asFlag(value) {
  if (value === true || value === 1 || value === "1" || value === "true" || value === "on") return 1;
  return 0;
}

function sqlDateTime(date) {
  if (!(date instanceof Date)) return date;
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function legacyRecord(value) {
  if (Array.isArray(value)) return value.map(legacyRecord);
  if (!value || typeof value !== "object") return value;
  if (value instanceof Date) return sqlDateTime(value);

  const source = typeof value.toObject === "function" ? value.toObject() : value;
  const result = {};
  for (const [key, item] of Object.entries(source)) {
    if (key === "_id" || key === "__v") continue;
    if (item instanceof Date) result[key] = sqlDateTime(item);
    else if (Array.isArray(item)) result[key] = item.map(legacyRecord);
    else if (item && typeof item === "object") result[key] = legacyRecord(item);
    else result[key] = item;
  }
  return result;
}

function numericId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function localDateString(date = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function addMonthsDateString(months) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setMonth(date.getMonth() + months);
  return localDateString(date);
}

module.exports = {
  nextId,
  syncCounter,
  escapeRegex,
  asFlag,
  legacyRecord,
  numericId,
  localDateString,
  addMonthsDateString,
};
