const express = require("express");
const router = express.Router();

const {createSubscription, getSubscription} = require("../controllers/subscription.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, createSubscription);
router.get("/",authMiddleware, getSubscription);

module.exports = router;