require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  jwtSecret: process.env.JWT_SECRET || "dev_secret_change_me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  adminEmail: (process.env.ADMIN_EMAIL || "").toLowerCase(),
  adminPasswordHash: process.env.ADMIN_PASSWORD_HASH || "",
  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.SMTP_FROM || "Technical Journals <no-reply@technicaljournals.org>",
    receiver: process.env.CONTACT_RECEIVER_EMAIL,
  },
};
