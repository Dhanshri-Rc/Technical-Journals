const router = require("express").Router();
const contactController = require("../controllers/contactController");
const { contactLimiter } = require("../middleware/rateLimit");

router.post("/", contactLimiter, contactController.submitContact);

module.exports = router;
