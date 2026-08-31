const { pool } = require("../config/db");
const asyncHandler = require("../utils/asyncHandler");
const { ok } = require("../utils/apiResponse");

const getStats = asyncHandler(async (_req, res) => {
  const [[journals]] = await pool.query("SELECT COUNT(*) AS total FROM journals");
  const [[conferences]] = await pool.query("SELECT COUNT(*) AS total FROM conferences");
  const [[universities]] = await pool.query("SELECT COUNT(*) AS total FROM universities");
  const [[newEnquiries]] = await pool.query("SELECT COUNT(*) AS total FROM contact_enquiries WHERE status = 'new'");
  const [[totalEnquiries]] = await pool.query("SELECT COUNT(*) AS total FROM contact_enquiries");
  const [[users]] = await pool.query("SELECT COUNT(*) AS total FROM users");

  return ok(res, {
    totalJournals: journals.total,
    totalConferences: conferences.total,
    totalUniversities: universities.total,
    newEnquiries: newEnquiries.total,
    totalEnquiries: totalEnquiries.total,
    totalUsers: users.total,
  });
});

module.exports = { getStats };
