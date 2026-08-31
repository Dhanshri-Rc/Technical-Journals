const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(
  process.cwd(),
  "uploads",
  "manuscripts"
);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },

  filename: (_req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9);

    const extension = path.extname(
      file.originalname
    );

    cb(
      null,
      `${uniqueName}${extension}`
    );
  },
});

const allowedExtensions = [
  ".pdf",
  ".doc",
  ".docx",
];

const fileFilter = (_req, file, cb) => {
  const extension = path
    .extname(file.originalname)
    .toLowerCase();

  if (!allowedExtensions.includes(extension)) {
    return cb(
      new Error(
        "Only PDF, DOC and DOCX files are allowed."
      )
    );
  }

  cb(null, true);
};

const manuscriptUpload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

module.exports = manuscriptUpload;