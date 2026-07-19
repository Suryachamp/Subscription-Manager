const express = require("express");
const router = express.Router();

const {createSubscription, getSubscription, getSubscriptionbyId, deleteSubscription} = require("../controllers/subscription.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, createSubscription);
router.get("/",authMiddleware, getSubscription);
router.get("/:id", authMiddleware, getSubscriptionbyId);
router.delete("/:id", authMiddleware, deleteSubscription);

module.exports = router;