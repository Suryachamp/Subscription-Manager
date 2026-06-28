const express = require("express");
const router = express.Router();

const {createSubscription} = require("../controllers/subscription.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, createSubscription);

module.exports = router;