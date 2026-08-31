const router = require("express").Router();
const journalController = require("../controllers/journalController");

router.get("/filter-options", journalController.getFilterOptions);
router.get("/featured", journalController.getFeaturedJournals);
router.get("/", journalController.getJournals);
router.get("/:idOrSlug", journalController.getJournalByIdOrSlug);

module.exports = router;
