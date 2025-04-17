const express = require("express");
const router = express.Router();
const {createStudent,getStudentById,getAllStudents,updateStudent,deleteStudent} 
    = require("../../../src/modules/student/controller/student.controller");


const auth = require("../../middleware/auth");
// router.get("/profile", auth(["student", "parent"]), profileHandler);



// تعريف الـ Routes
router.post("/", createStudent); 
router.get("/", getAllStudents); 
router.get("/:id", auth(["student", "parent"]), getStudentById); 
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);




module.exports = router;
