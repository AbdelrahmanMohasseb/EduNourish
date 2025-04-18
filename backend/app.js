const express = require("express");
require("dotenv").config();
const cors = require("cors");

const studentRoutes = require('./src/modules/student/student.router');
const advisorRoutes = require("./src/modules/advisor/advisor.router");
const organizerRoutes = require("./src/modules/organizer/organizer.router");
const parentRoutes = require("./src/modules/parent/parent.router");
const teacherRoutes = require("./src/modules/teacher/teacher.router");
const BusRoutes = require("./src/modules/Bus/Bus.router");
const newsRoutes = require("./src/modules/news/news.router");
const feedbackRoutes = require("./src/modules/feedback/feedback.router");
const adviceRoutes = require("./src/modules/advice/advice.router");
const subjectRoutes = require("./src/modules/subject/subject.router");
const timetableRoutes=require("./src/modules/Timetable/timetable.router")
const ExamRoutes=require("./src/modules/Exam/Exam.router");
const gradeRoutes=require("./src/modules/grade/grade.router");
const AttendanceRoutes=require("./src/modules/attendance/attendance.router");
const uploadRoutes = require("./src/modules/upload/upload.router");
const studentExamRouter = require("./src/modules/studentexam/studentexam.router");
const resturantMenu=require("./src/modules/resturantMenuItem/resturantMenuItem.router")
const excuseRoutes=require("./src/modules/Excuse/Excuse.router")
const PaymentRoutes=require("./src/modules/Payment/payment.router")
const classRoutes=require("./src/modules/class/calss.router")
const instructionAIRouter = require("./src/modules/instructionAi/instructionAi.router");
const classTeacherRoutes = require("./src/modules/classteacher/classteacher.router");
const loginRoutes = require("./src/modules/login/Login.router.js");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);



const app = express();


app.use(express.json({
  verify: (req, res, buf) => {
    try {
      JSON.parse(buf.toString());
    } catch (e) {
      res.status(400).json({ error: "Invalid JSON format" });
      throw new Error("Invalid JSON");
    }
  }
}));
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.post("/api/payments/webhook", 
  express.raw({ type: 'application/json' }), 
  require("./src/modules/Payment/controller/payment.controller").stripeWebhook);


// Routes
app.use("/api/Login", loginRoutes);
app.use('/api/students',studentRoutes)
app.use("/api/advisors", advisorRoutes);
app.use("/api/organizers", organizerRoutes);
app.use("/api/parents", parentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/buses", BusRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/advices", adviceRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/timetables",timetableRoutes);
app.use("/api/exams",ExamRoutes);
app.use("/api/grades",gradeRoutes);
app.use("/api/attendance", AttendanceRoutes);
app.use("/api/upload-profile-picture", uploadRoutes);
app.use("/api/studentexams", studentExamRouter);
app.use("/api/ResturantMenu",resturantMenu);
app.use("/api/Excuses",excuseRoutes);
app.use("/api/payments",PaymentRoutes)
app.use("/api/Classes",classRoutes)
app.use("/api/class-teachers", classTeacherRoutes);
app.use("/api/instruction-ai", instructionAIRouter);


// Server
const PORT = 3000;
app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});