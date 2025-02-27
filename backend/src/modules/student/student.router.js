const express = require("express");
const router = express.Router();
const {
    createStudent,getStudentById,getAllStudents,updateStudent,deleteStudent} 
    = require("../../../src/modules/student/controller/student.controller");

// تعريف الـ Routes
router.post("/", createStudent); 
router.get("/", getAllStudents); 
router.get("/:id", getStudentById); 
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

// // إضافة المسارات الجديدة
// router.get("/:id/viewTable", viewTable);

// router.get("/:id/viewSubjects", viewSubjects);

// router.get("/checkMenu", checkMenu);
// router.post("/addMenuItem",addMenuItem);

// router.post("/submitAssignments",submitAssignments);
// router.get("/:id/getAssignments", getAssignments);

// router.get("/:id/getActivities", getStudentActivities);
// router.post("/participateActivity", participateActivity);

// router.post("/markAttendance", markAttendance);
// router.get("/:id/attendance", getAttendance);

// router.get("/:id/viewGrades",viewGrades);
// router.post("/addGrade",addGrade);

// router.get("/:id/displayStudentInfo", displayStudentInfo);

module.exports = router;
