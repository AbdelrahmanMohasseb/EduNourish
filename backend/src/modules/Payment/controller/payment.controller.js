require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { Payment, Student } = require("../../../../DB/models");

exports.createCheckoutSession = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: { name: "School Payment" },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    await Payment.create({
      studentId,
      amount,
      stripeSessionId: session.id,
      type: "pocketmoney",
      status: "pending",
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("❌ Error creating session:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("✅ Webhook received:", event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      const payment = await Payment.findOne({
        where: { stripeSessionId: session.id }
      });

      if (!payment) {
        console.log("❌ Payment not found for session:", session.id);
        return res.status(404).send("Payment not found");
      }

      await payment.update({ status: "paid" });

      if (payment.type === "pocketmoney") {
        const student = await Student.findByPk(payment.studentId);
        if (student) {
          student.pocketmoney += payment.amount;
          await student.save();
          console.log("💰 Pocketmoney added to student:", student.id);
        } else {
          console.log("❌ Student not found:", payment.studentId);
        }
      }
    } catch (e) {
      console.error("❌ Error handling session completed:", e.message);
    }
  }

  res.status(200).json({ received: true });
};

exports.usePocketMoney = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { amount } = req.body;

    const student = await Student.findByPk(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (student.pocketmoney < amount) {
      return res.status(400).json({ message: "Not enough pocket money" });
    }

    student.pocketmoney -= amount;
    await student.save();

    await Payment.create({
      studentId,
      amount,
      status: "paid",
      type: "pocketmoney-used",
    });

    res.status(200).json({ message: "Pocket money used", pocketMoney: student.pocketmoney });
  } catch (error) {
    console.error("❌ usePocketMoney error:", error.message);
    res.status(500).json({ error: error.message });
  }
};
