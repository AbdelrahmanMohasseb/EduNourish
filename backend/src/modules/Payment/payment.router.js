const express = require("express");
const router = express.Router();
const paymentController = require("../Payment/controller/payment.controller");

router.post("/create-checkout-session/:id", paymentController.createCheckoutSession);
router.post("/webhook", express.raw({ type: 'application/json' }), paymentController.stripeWebhook);
router.post("/receive-pocket-money/:id", paymentController.receivePocketMoney);

module.exports = router;