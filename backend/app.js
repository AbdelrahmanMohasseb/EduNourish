const express = require("express");

const studentRoutes = require('./src/modules/student/student.router');
const advisorRoutes = require("./src/modules/advisor/advisor.router");
const organizerRoutes = require("./src/modules/organizer/organizer.router");
const parentRoutes = require("./src/modules/parent/parent.router");
const teacherRoutes = require("./src/modules/teacher/teacher.router");
const BusRoutes = require("./src/modules/Bus/Bus.router");
const subjectRoutes = require("./src/modules/subject/subject.router");
const ExamRouter=require("./src/modules/Exam/Exam.router");
const quizRouter=require("./src/modules/Quiz/Quiz.router");
const gradeRouter=require("./src/modules/grade/grade.router");

const app = express();

app.use(express.json());

// Routes
app.use('/api/students',studentRoutes)
app.use("/api/advisors", advisorRoutes);
app.use("/api/organizers", organizerRoutes);
app.use("/api/parents", parentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/buses", BusRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/exams",ExamRouter);
app.use("/api/quiz",quizRouter);
app.use("/api/grade",gradeRouter);


// Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});