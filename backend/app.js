require('dotenv').config();
const express = require("express");

console.log("STRIPE_SECRET_KEY =", process.env.STRIPE_SECRET_KEY);

const studentRoutes = require('./src/modules/student/student.router');
const advisorRoutes = require("./src/modules/advisor/advisor.router");
const organizerRoutes = require("./src/modules/organizer/organizer.router");
const parentRoutes = require("./src/modules/parent/parent.router");
const teacherRoutes = require("./src/modules/teacher/teacher.router");
const BusRoutes = require("./src/modules/Bus/Bus.router");
const timetableRoutes=require("./src/modules/Timetable/timetable.router")
const resturantMenu=require("./src/modules/resturantMenuItem/resturantMenuItem.router")
const excuseRoutes=require("./src/modules/Excuse/Excuse.router")
const pocketMoneyRoutes=require("./src/modules/pocketMoney/pocketMoney.router")
const PaymentRoutes=require("./src/modules/Payment/payment.router")
const classRoutes=require("./src/modules/class/class.router")
const classTeacherRoutes = require("./src/modules/classteacher/classteacher.router");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


const app = express();

app.post("/api/payments/webhook", 
  express.raw({ type: 'application/json' }), 
  require("./src/modules/Payment/controller/payment.controller").stripeWebhook);


app.use(express.json());


app.use('/api/students',studentRoutes)
app.use("/api/advisors", advisorRoutes);
app.use("/api/organizers", organizerRoutes);
app.use("/api/parents", parentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/buses", BusRoutes);
app.use("/api/timetables",timetableRoutes);
app.use("/api/ResturantMenu",resturantMenu);
app.use("/api/Excuses",excuseRoutes);
app.use("/api/pocket-money",pocketMoneyRoutes)
app.use("/api/payments",PaymentRoutes)
app.use("/api/Classes",classRoutes)
app.use("/api/class-teachers", classTeacherRoutes);




// Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});