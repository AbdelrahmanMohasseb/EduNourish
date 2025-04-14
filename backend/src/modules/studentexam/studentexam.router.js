const express = require("express");
const router = express.Router();

// استيراد الـ controller
const studentexamcontroller  = require("../studentexam/contoller/studentexam.contoller");

// هنا نحن نستخدم المسار "/student-exam" للإضافة
router.post("/", studentexamcontroller.createStudentExam); // يجب أن يكون المسار هو "/"

// لجلب الامتحانات بناءً على الطالب
router.get("/student/:studentId/exams", studentexamcontroller.getExamsByStudent);

// لجلب الطلاب بناءً على الامتحان
router.get("/exam/:examId/students", studentexamcontroller.getStudentsByExam);

module.exports = router;