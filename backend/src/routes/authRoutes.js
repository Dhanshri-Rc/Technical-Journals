const router = require("express").Router();
const authController = require("../controllers/authController");
const { authenticateToken } = require("../middleware/auth");
const { authLimiter } = require("../middleware/rateLimit");

router.post("/register", authLimiter, authController.register);
router.post("/login", authLimiter, authController.login);
router.get("/me", authenticateToken, authController.me);
router.post("/logout", authenticateToken, authController.logout);

module.exports = router;
