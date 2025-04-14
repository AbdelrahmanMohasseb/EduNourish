const express = require("express");
const examController = require("../Exam/controller/Exam.controller");

const router = express.Router();


router.post("/", examController.createExam);

router.get("/", examController.getAllExams);

router.get("/:id", examController.getExamById);

router.put("/:id", examController.updateExam);

router.delete("/:id", examController.deleteExam);

module.exports = router;
