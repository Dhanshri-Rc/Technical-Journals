const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const env = require("./config/env");
const { notFoundMiddleware, errorHandler } = require("./middleware/errorHandler");

const authRoutes = require("./routes/authRoutes");
const journalRoutes = require("./routes/journalRoutes");
const conferenceRoutes = require("./routes/conferenceRoutes");
const universityRoutes = require("./routes/universityRoutes");
const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminRoutes");
const manuscriptRoutes = require(
  "./routes/manuscriptRoutes"
);
const footerSettingsRoutes = require("./routes/footerSettingsRoutes");
const app = express();

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({ origin: env.frontendUrl, credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.get("/api/health", (_req, res) => res.json({ success: true, message: "API is running" }));

app.use("/api/auth", authRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api/conferences", conferenceRoutes);
app.use("/api/universities", universityRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/footer-settings", footerSettingsRoutes);
app.use("/api/admin", adminRoutes);
app.use(
  "/api/manuscripts",
  manuscriptRoutes
);
app.use(notFoundMiddleware);
app.use(errorHandler);

module.exports = app;
