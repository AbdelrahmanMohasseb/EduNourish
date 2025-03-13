const express = require("express");
const router = express.Router();
const gradeController = require("../grade/controller/grade.controller");

router.post("/", gradeController.addGrade); 
router.get("/", gradeController.getAllGrades); 
router.get("/:studentId", gradeController.getGradesByStudent); 
router.put("/:id", gradeController.updateGrade); 
router.delete("/:id", gradeController.deleteGrade); 

module.exports = router;
