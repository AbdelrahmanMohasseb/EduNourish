const express = require("express");
const router = express.Router();
const quizController = require("../Quiz/controller/Quiz.contoller");

router.post("/", quizController.createQuiz);
router.get("/", quizController.getAllQuizzes);
router.get("/:id", quizController.getQuizById);
router.put("/:id", quizController.updateQuiz);
router.delete("/:id", quizController.deleteQuiz);

module.exports = router;
