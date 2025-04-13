// // 📁 controllers/payment.controller.js
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../../../../DB/models/payment");

exports.createCheckoutSession = async (req, res) => {
  try {
    const { id, studentId, amount } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "School Payment",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    await Payment.create({
        id,
      studentId,
      amount,
      stripeSessionId: session.id
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    await Payment.update({ status: "paid" }, {
      where: { stripeSessionId: session.id }
    });
  }

  res.status(200).json({ received: true });
};

exports.getAllPayments = async (req, res) => {
    const payments = await Payment.findAll();
    res.json(payments);
  };
  