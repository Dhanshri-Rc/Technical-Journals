const router = require("express").Router();
const conferenceController = require("../controllers/conferenceController");

router.get("/filter-options", conferenceController.getFilterOptions);
router.get("/", conferenceController.getConferences);
router.get("/:idOrSlug", conferenceController.getConferenceByIdOrSlug);

module.exports = router;
