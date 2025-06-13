const express = require("express");
require("dotenv").config();
const socketManager = require("./src/services/socketManager.js");


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
const loginRoutes = require("./src/modules/login/login.router.js");
const cors = require("cors");
const materialRoutes = require("./src/modules/material/material.router.js");
const paymentController = require("./src/modules/Payment/controller/payment.controller");
// const {sendEmail}=require("./src/services/email.js")
// const {createInvoice}=require("./src/services/createPDF.js")
const reportRoutes = require("./src/modules/report/report.router.js");
const gradeReportRoutes = require("./src/modules/gradereport/gradereport.router.js");

const app = express();
const http = require('http'); 
const server = http.createServer(app);

// Initialize Socket.IO
socketManager.initialize(server);

app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  paymentController.stripeWebhook
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://mario5542395.github.io/finally/"); 
  next();
});

app.use(cors());

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
app.use("/api/materials", materialRoutes);
app.use("/api/report", reportRoutes);
app.use("/api", gradeReportRoutes);

app.use("/api/notifications", require("./src/modules/notification/notification.router.js"));

// app.get("/pdf", async(req, res) => {


//     const invoice = await userModel.find({}).select('-password');


//     const mypath = path.join(__dirname, './pdf')
//     createInvoice(invoice, mypath + "/one.pdf")

//     await sendEmail('mahmoudelwan460@gmail.com', "<p>first pdf</p>", [{
//         filename: "one.pdf",
//         path: mypath + "/one.pdf",
//         contentType: 'application/pdf'

//     }])
//     res.end()
// })


const PORT = 3000;
server.listen(PORT,'0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});