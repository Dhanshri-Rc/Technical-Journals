const router = require("express").Router();
const universityController = require("../controllers/universityController");

router.get("/", universityController.getUniversities);
router.get("/:idOrSlug", universityController.getUniversityByIdOrSlug);

module.exports = router;
