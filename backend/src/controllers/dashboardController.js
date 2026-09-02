const { Journal, Conference, University, Enquiry, User } = require("../db/models");
const asyncHandler = require("../utils/asyncHandler");
const { ok } = require("../utils/apiResponse");

const getStats = asyncHandler(async (_req, res) => {
  const [totalJournals, totalConferences, totalUniversities, newEnquiries, totalEnquiries, totalUsers] = await Promise.all([
    Journal.countDocuments({}),
    Conference.countDocuments({}),
    University.countDocuments({}),
    Enquiry.countDocuments({ status: "new" }),
    Enquiry.countDocuments({}),
    User.countDocuments({}),
  ]);

  return ok(res, {
    totalJournals,
    totalConferences,
    totalUniversities,
    newEnquiries,
    totalEnquiries,
    totalUsers,
  });
});

module.exports = { getStats };
