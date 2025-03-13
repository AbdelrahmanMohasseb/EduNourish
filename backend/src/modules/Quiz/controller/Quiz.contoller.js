const {Quiz} = require("../../../../DB/models/index");

exports.createQuiz = async (req, res) => {
  try {
    const { subjectName, date, totalMarks, duration, status } = req.body;
    const newQuiz = await Quiz.create({ subjectName, date, totalMarks, duration, status });
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ error: "Error creating quiz", details: error.message });
  }
};

exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.findAll();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching quizzes", details: error.message });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ error: "Error fetching quiz", details: error.message });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    await quiz.update(req.body);
    res.status(200).json({ message: "Quiz updated successfully", quiz });
  } catch (error) {
    res.status(500).json({ error: "Error updating quiz", details: error.message });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    await quiz.destroy();
    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting quiz", details: error.message });
  }
};
