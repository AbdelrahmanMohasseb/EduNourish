const express = require("express");
const router = express.Router();
const {createStudent,getStudentById,getAllStudents,updateStudent,deleteStudent,getClassByStudent} 
    = require("../../../src/modules/student/controller/student.controller");
const auth = require("../../middleware/auth");


router.post("/", createStudent); 
router.get("/", getAllStudents); 
router.get("/:id", auth(["student", "parent"]), getStudentById); 
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.get("/class",auth(["student", "parent"]), getClassByStudent);



module.exports = router;
