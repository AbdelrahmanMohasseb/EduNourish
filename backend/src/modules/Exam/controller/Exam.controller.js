const { Exam } = require("../../../../DB/models/index");



exports.createExam = async (req, res) => {
  try {
    const { subjectName, date, duration, totalMarks, status } = req.body;
    const newExam = await Exam.create({ subjectName, date, duration, totalMarks, status });

    res.status(201).json(newExam);
  } catch (error) {
    res.status(500).json({ error: "Error creating exam", details: error.message });
  }
};




exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.findAll();
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ error: "Error fetching exams", details: error.message });
  }
};


exports.getExamById = async (req, res) => {
  try {
    const exam = await Exam.findByPk(req.params.id);
    if (!exam) return res.status(404).json({ error: "Exam not found" });
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ error: "Error fetching exam", details: error.message });
  }
};


exports.updateExam = async (req, res) => {
  try {
    const exam = await Exam.findByPk(req.params.id);
    if (!exam) return res.status(404).json({ error: "Exam not found" });

    await exam.update(req.body);
    res.status(200).json({ message: "Exam updated successfully", exam });
  } catch (error) {
    res.status(500).json({ error: "Error updating exam", details: error.message });
  }
};


exports.deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findByPk(req.params.id);
    if (!exam) return res.status(404).json({ error: "Exam not found" });

    await exam.destroy();
    res.status(200).json({ message: "Exam deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting exam", details: error.message });
  }
};
