const { Grade, Exam,Student } = require("../../../../DB/models/index");

const getStudentGradesReport = async (req, res) => {
  try {
    const { id } = req.params; // studentIDg

    // Get all grades for the student
    const grades = await Grade.findAll({
      where: { studentIDg: id },
    });

    if (!grades || grades.length === 0) {
      return res.status(404).json({ message: "No grades found for this student." });
    }

    // Map grades to [subjectName, obtainedMarks]
    const gradeReport = await Promise.all(
      grades.map(async (grade) => {
        const exam = await Exam.findOne({
          where: { id: grade.examId },
          attributes: ["subjectName"],
        });

        return [exam?.subjectName || "Unknown", grade.obtainedMarks];
      })
    );

    const gradeReport2 = Object.fromEntries(gradeReport);

    // Get student's email
    const student = await Student.findOne({
      where: { id: id },
      attributes: ["email"],
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    // Respond with grades and email
    res.status(200).json({
      email: student.email,
      grades_data: gradeReport2,
    });
  } catch (error) {
    console.error("Error fetching student grade report:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports = { getStudentGradesReport };
