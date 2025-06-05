const { Grade, Exam } = require("../../../../DB/models/index");

const getStudentGradesReport = async (req, res) => {
  try {
    const { id } = req.params;

    // Get all grades for the student
    const grades = await Grade.findAll({
      where: { studentIDg:id },
    });

    if (!grades || grades.length === 0) {
      return res.status(404).json({ message: "No grades found for this student." });
    }

    // Map through grades and fetch subjectName for each examId
    const gradeReport = await Promise.all(
      grades.map(async (grades) => {
        const exam = await Exam.findOne({
          where: { id: grades.examId },
          attributes: ["subjectName"], // or join with subject if not in Exam directly
        });

        return [exam?.subjectName || "Unknown", grades.obtainedMarks];
      })
    );

    const gradeReport2 = Object.fromEntries(gradeReport);

    res.status(200).json({ grades_data: gradeReport2 });
  } catch (error) {
    console.error("Error fetching student grade report:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getStudentGradesReport };
