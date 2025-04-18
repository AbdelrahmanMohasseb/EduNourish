
const { Student, Class ,Payment,} = require("../../../../DB/models/index");
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken");



exports.createStudent = async (req, res) => {
    try {
        const { id,userName, email, password, phoneNumber, photo, address, age, gender, academicYear, classNumber , classId,parentId} = req.body;

        const existingUser = await Student.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const student = await Student.create({
            id,
            userName,
            email,
            password: hashedPassword,
            phoneNumber,
            photo,
            address,
            age,
            gender,
            pocketmoney,
            academicYear,
            classNumber,
            classId,
            parentId
        });

        const token = jwt.sign({ id: student.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
 
        res.status(201).json({ message: "Student created successfully", student });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStudentById = async (req, res) => {
    try {
        // const student = await Student.findOne({
        //     where: { id: req.params.id }
        // });
        // const student = await Student.findOne({ _id: req.user._id }).select('-password');
        const student = await Student.findOne({
            where: { id: req.user.id },
            include: [
                {model: Attendance},
                {
                    model: Payment,
                    attributes: ['id', 'amount','status',  'createdAt']
                },
                {
                    model: Class,
                    attributes: ['id', 'className']
                }
                // {model: Advice},
                // {model:InstructionAI},
                // ,as: 'students' // Optional: Specify the alias for the association
              ],
            attributes: { exclude: ['password'] }
          });


        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.findAll();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        await student.update(req.body);
        res.status(200).json({ message: "Student updated successfully", student });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        await student.destroy();
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getClassByStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findByPk(studentId, {
            include: {
                model: Class,
                attributes: ['id', 'className']
            }
        });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({
            studentId: student.id,
            studentName: student.userName,
            class: student.Class
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};