const express = require("express");

const studentRoutes = require('./src/modules/student/student.router');
const advisorRoutes = require("./src/modules/advisor/advisor.router");
const organizerRoutes = require("./src/modules/organizer/organizer.router");
const parentRoutes = require("./src/modules/parent/parent.router");
const teacherRoutes = require("./src/modules/teacher/teacher.router");
const BusRoutes = require("./src/modules/Bus/Bus.router");
const newsRoutes = require("./src/modules/news/news.router");
const feedbackRoutes = require("./src/modules/feedback/feedback.router");
const adviceRoutes = require("./src/modules/advice/advice.router");


const app = express();

app.use(express.json());

// Routes
app.use('/api/students',studentRoutes)
app.use("/api/advisors", advisorRoutes);
app.use("/api/organizers", organizerRoutes);
app.use("/api/parents", parentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/buses", BusRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/advices", adviceRoutes);



// Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});