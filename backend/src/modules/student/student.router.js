const express = require("express");
const router = express.Router();
const {
    createStudent,getStudentById,getAllStudents,updateStudent,deleteStudent} 
    = require("../../../src/modules/student/controller/student.controller");

router.post("/", createStudent); 
router.get("/", getAllStudents); 
router.get("/:id", getStudentById); 
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);



module.exports = router;
