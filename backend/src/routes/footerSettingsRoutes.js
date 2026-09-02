const router = require("express").Router();
const footerSettingsController = require("../controllers/footerSettingsController");

router.get("/", footerSettingsController.getPublicFooterSettings);

module.exports = router;
