const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const ALLOWED_MIME = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp"]);
const ALLOWED_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

function makeUploader(subfolder) {
  const dest = path.join(__dirname, "..", "..", "uploads", subfolder);
  fs.mkdirSync(dest, { recursive: true });

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, dest),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const unique = crypto.randomBytes(16).toString("hex");
      cb(null, `${Date.now()}-${unique}${ext}`);
    },
  });

  const fileFilter = (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!ALLOWED_MIME.has(file.mimetype) || !ALLOWED_EXT.has(ext)) {
      return cb(new Error("Only jpg, jpeg, png and webp image files are allowed"));
    }
    cb(null, true);
  };

  return multer({ storage, fileFilter, limits: { fileSize: MAX_SIZE } });
}

function publicUrl(subfolder, filename) {
  return `/uploads/${subfolder}/${filename}`;
}

module.exports = { makeUploader, publicUrl };
