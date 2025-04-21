require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const {Payment,Student} = require("../../../../DB/models/index");

exports.createCheckoutSession = async (req, res) => {
  try {
    const studentId = req.params.id;
    const {  amount } = req.body;

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
      studentId,
      amount,
       stripeSessionId: session.id,
       type: "pocketmoney"
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
    console.log("✅ Webhook received:", event.type);
  } catch (err) {
    console.error("❌ Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("🔎 Session ID from Stripe:", session.id);

    const payment = await Payment.findOne({
      where: { stripeSessionId: session.id }
    });

    if (!payment) {
      console.log("❌ Payment not found for session:", session.id);
      return res.status(404).json({ message: "Payment not found" });
    }

    console.log("✅ Payment before update:", payment);

    await payment.update({ status: "paid" });

    if (payment.type === "pocketmoney") {
      const student = await Student.findByPk(payment.studentId);
      if (student) {
        console.log("💵 Before update:", student.pocketmoney);
        student.pocketmoney += payment.amount;
        await student.save();
        console.log("💵 After update:", student.pocketmoney);
      } else {
        console.log("❌ Student not found:", payment.studentId);
      }
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
      type: "pocketmoney-used"
    });

    res.status(200).json({ message: "Amount deducted from pocket money", pocketMoney: student.pocketmoney });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  