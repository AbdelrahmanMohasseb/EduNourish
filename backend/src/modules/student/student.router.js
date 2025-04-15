const express = require("express");
const router = express.Router();
const {createStudent,getStudentById,getAllStudents,updateStudent,deleteStudent,signup, signin,getClassByStudent,receivePocketMoney} 
    = require("../../../src/modules/student/controller/student.controller");

const { validateStudentSignup, validateStudentSignin } = require("./student.validator"); 



// تعريف الـ Routes
router.post("/", createStudent); 
router.get("/", getAllStudents); 
router.get("/:id", getStudentById); 
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.get("/:studentId/class", getClassByStudent);
//router.post("/:studentId/pocket-money", receivePocketMoney);


router.post("/signup", validateStudentSignup, signup);
router.post("/signin",validateStudentSignin,signin)

module.exports = router;
