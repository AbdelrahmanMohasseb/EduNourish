const {StudentExam} = require("../../../../DB/models/index")

const {Student} = require("../../../../DB/models/index");
const {Exam }= require("../../../../DB/models/index");

exports.createStudentExam = async (req, res) => {
    try {
        const { studentId, examId } = req.body;
        const studentExam = await StudentExam.create({ studentId, examId });
        res.status(201).json(studentExam);
    } catch (error) {
        res.status(500).json({ error: "Error adding student to exam", details: error.message });
    }
};

exports.getExamsByStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findByPk(studentId, {
            include: {
                model: Exam,
                through: { attributes: [] },
            },
        });

        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.status(200).json(student.Exams);
    } catch (error) {
        res.status(500).json({ error: "Error fetching exams", details: error.message });
    }
};

exports.getStudentsByExam = async (req, res) => {
    try {
        const { examId } = req.params;
        const exam = await Exam.findByPk(examId, {
            include: {
                model: Student,
                through: { attributes: [] },
            },
        });

        if (!exam) {
            return res.status(404).json({ error: "Exam not found" });
        }

        res.status(200).json(exam.Students);
    } catch (error) {
        res.status(500).json({ error: "Error fetching students", details: error.message });
    }
};
