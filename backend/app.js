const express = require("express");
const studentRoutes = require('./src/modules/student/student.router');
const advisorRoutes = require("./src/modules/advisor/advisor.router");
const organizerRoutes = require("./src/modules/organizer/organizer.router");
const parentRoutes = require("./src/modules/parent/parent.router");
const teacherRoutes = require("./src/modules/teacher/teacher.router");
const BusRoutes = require("./src/modules/Bus/Bus.router");
const subjectRoutes = require("./src/modules/subject/subject.router");
const ExamRoutes=require("./src/modules/Exam/Exam.router");

const gradeRoutes=require("./src/modules/grade/grade.router");
const AttendanceRoutes=require("./src/modules/attendance/attendance.routes");


const uploadRoutes = require("./src/modules/upload/uploadRoutes");


const studentExamRouter = require("./src/modules/studentexam/studentexam.router")
const app = express();
app.use(express.json());


require("dotenv").config();






//picture
app.use(express.urlencoded({ extended: true })); 


// Routes
app.use('/api/students',studentRoutes)
app.use("/api/advisors", advisorRoutes);
app.use("/api/organizers", organizerRoutes);
app.use("/api/parents", parentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/buses", BusRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/exams",ExamRoutes);

app.use("/api/grades",gradeRoutes);
app.use("/api/attendance", AttendanceRoutes);


app.use("/api/upload-profile-picture", uploadRoutes);

app.use("/api/studentexams", studentExamRouter);  // تأكد من المسار الصحيح


// Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});