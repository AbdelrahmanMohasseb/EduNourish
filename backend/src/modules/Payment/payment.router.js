const express = require("express");
const router = express.Router();
const paymentController = require("../Payment/controller/payment.controller");

router.post("/create-checkout-session", paymentController.createCheckoutSession);
router.post("/webhook", express.raw({ type: 'application/json' }), paymentController.stripeWebhook);
router.get("/", paymentController.getAllPayments);

module.exports = router;