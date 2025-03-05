const express = require("express");
const router = express.Router();
const {createStudent,getStudentById,getAllStudents,updateStudent,deleteStudent,signup} 
    = require("../../../src/modules/student/controller/student.controller");
const { validateStudentSignup } = require("./student.validator"); 

router.post("/", createStudent); 
router.get("/", getAllStudents); 
router.get("/:id", getStudentById); 
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.post("/signup", validateStudentSignup, signup);



module.exports = router;
