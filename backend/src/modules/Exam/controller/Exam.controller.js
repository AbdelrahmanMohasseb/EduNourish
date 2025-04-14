const { Exam,Student } = require("../../../../DB/models/index");



exports.createExam = async (req, res) => {
  try {
    const { id, subjectName, duration, totalMarks, date, status, Type } = req.body;
    const newExam = await Exam.create({ id, subjectName, duration, totalMarks, date, status, Type});

    res.status(201).json(newExam);
  } catch (error) {
    console.error("Error creating exam:", error); // اطبع الخطأ الحقيقي
    res.status(500).json({ error: "Error creating exam", details: error.message || error });
  }
};


exports.assignStudentToExam = async (req, res) => {
  try {
    const { studentId, examId } = req.body;

    // تأكد من أن الطالب والامتحان موجودين
    const student = await Student.findByPk(studentId);
    const exam = await Exam.findByPk(examId);

    if (!student || !exam) {
      return res.status(404).json({ error: "Student or Exam not found" });
    }

    // إضافة الطالب إلى الامتحان عبر جدول الربط
    const studentExam = await StudentExam.create({ studentId, examId });

    res.status(201).json(studentExam);
  } catch (error) {
    res.status(500).json({ error: "Error assigning student to exam", details: error.message });
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

