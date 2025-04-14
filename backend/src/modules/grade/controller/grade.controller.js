const { Grade } = require("../../../../DB/models/index") ;

exports.addGrade = async (req, res) => {
  try {
    const { studentId, examId, quizId, obtainedMarks, grade } = req.body;
    
    if (!studentId || !obtainedMarks || !grade) {
      return res.status(400).json({ error: "All required fields must be filled!" });
    }

    const newGrade = await Grade.create({ studentId, examId, quizId, obtainedMarks, grade });
    res.status(201).json(newGrade);
  } catch (error) {
    res.status(500).json({ error: "Error adding grade", details: error.message });
  }
};
exports.getAllGrades = async (req, res) => {
  try {
    if (!Grade) {
      return res.status(500).json({ error: "Grade model not found" });
    }

    const grades = await Grade.findAll();
    res.status(200).json(grades);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving grades", details: error.message });
  }
};

exports.getGradesByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const grades = await Grade.findAll({ where: { studentId } });

    if (grades.length === 0) {
      return res.status(404).json({ message: "No grades found for this student" });
    }

    res.status(200).json(grades);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving student grades", details: error.message });
  }
};exports.updateGrade = async (req, res) => {
  try {
    const { id } = req.params;
    const { obtainedMarks, grade } = req.body;

    const gradeRecord = await Grade.findByPk(id);
    if (!gradeRecord) {
      return res.status(404).json({ error: "Grade not found" });
    }

    await gradeRecord.update({ obtainedMarks, grade });
    res.status(200).json(gradeRecord);
  } catch (error) {
    res.status(500).json({ error: "Error updating grade", details: error.message });
  }
};
 
 exports.deleteGrade = async (req, res) => {
  try {
    const { id } = req.params;

    const gradeRecord = await Grade.findByPk(id);
    if (!gradeRecord) {
      return res.status(404).json({ error: "Grade not found" });
    }

    await gradeRecord.destroy();
    res.status(200).json({ message: "Grade successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting grade", details: error.message });
  }
} ;