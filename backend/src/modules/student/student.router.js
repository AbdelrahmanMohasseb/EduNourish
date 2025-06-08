const express = require("express");
const router = express.Router();
const {createStudent,getStudentById,getStudentByIdParam, getAllStudents,updateStudent,updateStudentPhoto,deleteStudent,getClassByStudent} 
    = require("../../../src/modules/student/controller/student.controller");
const auth = require("../../middleware/auth");
const { validateStudent } = require('./student.validator');
const upload = require("../../middleware/multer"); 

router.post("/", createStudent); 
router.get("/", getAllStudents); 
router.get("/:id", auth(["student", "parent"]), getStudentById); 
router.get("/byparam/:id", getStudentByIdParam); 
router.put("/:id", updateStudent);
router.put("/updatephoto/:id",upload.single("image"),updateStudentPhoto);
router.delete("/:id", deleteStudent);
router.get("/class",auth(["student", "parent"]), getClassByStudent);

module.exports = router;
