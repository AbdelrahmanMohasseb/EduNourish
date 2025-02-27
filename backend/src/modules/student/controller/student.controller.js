const {Student} = require("../../../../DB/models/index");


exports.createStudent = async (req, res) => {
    try {
        const { id,userName, email, password, phoneNumber, photo, address, age, gender, pocketmoney, academicYear, classNumber } = req.body;

        const existingUser = await Student.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const student = await Student.create({
            id,
            userName,
            email,
            password, 
            phoneNumber,
            photo,
            address,
            age,
            gender,
            pocketmoney,
            academicYear,
            classNumber
        });


        res.status(201).json({ message: "Student created successfully", student });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findOne({
            where: { id: req.params.id }
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
