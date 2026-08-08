const express = require("express");
const { register, login, me, logout } = require("../controllers/auth.controller");
const authMiddleware = require('../middleware/auth.middleware');
const { authLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.get("/me",authMiddleware,me);
router.post("/logout",logout);

module.exports = router;
