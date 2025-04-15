const { Student, Signup, Class ,Payment,} = require("../../../../DB/models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const StudentSignup = require("../../../../DB/models/studentsignup");

exports.createStudent = async (req, res) => {
    try {
        const { id, userName, email, password, phoneNumber, photo, address, age, gender, academicYear, classId, parentId } = req.body;

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
            academicYear,
            classId,
            parentId,
            pocketmoney: 0 // Initial 
        });

        res.status(201).json({ message: "Student created successfully", student });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStudentById = async (req, res) => {
    try {
        const studentId = req.params.id;

        const student = await Student.findByPk(studentId, {
            include: [
                {
                    model: Payment,
                    attributes: ['id', 'amount','status',  'createdAt']
                },
                {
                    model: Class,
                    attributes: ['id', 'className']
                }
            ]
        });

        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.json(student);
    } catch (error) {
        console.error("Error fetching student:", error);
        res.status(500).json({ error: "Internal server error" });
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

exports.signup = async (req, res) => {
    try {
        const { userName, email, password, classNumber } = req.body;

        if (!userName || !email || !password || !classNumber) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const existingStudent = await Student.findOne({ where: { email } });
        if (existingStudent) {
            return res.status(400).json({ message: "Email is already registered!" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = await Signup.create({
            userName,
            email,
            password: hashedPassword,
            classNumber
        });

        const token = jwt.sign({ id: newStudent.id }, "your_secret_key", { expiresIn: "1h" });

        res.status(201).json({
            message: "Account created successfully!",
            student: { id: newStudent.id, userName: newStudent.userName, email: newStudent.email },
            token
        });

    } catch (error) {
        console.error(error);

        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({
                message: "Validation error",
                errors: error.errors.map(err => err.message)
            });
        }

        res.status(500).json({ message: "A server error occurred!" });
    }
};

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const student = await StudentSignup.findOne({ where: { email } });
        if (!student) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: student.id, email: student.email },
            process.env.JWT_SECRET || "your_secret_key",
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successful",
            student: {
                id: student.id,
                userName: student.userName,
                email: student.email,
                classNumber: student.classNumber
            },
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
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
        res.status(500).json({ error: error.message });
    }
};

// 📥 استلام مصروف من ولي أمر
// exports.receivePocketMoney = async (req, res) => {
//     try {
//         const { studentId, amount } = req.body;

//         const student = await Student.findByPk(studentId);
//         if (!student) return res.status(404).json({ message: "Student not found" });

//         // إضافة المصروف الجديد إلى الرصيد الحالي
//         const newBalance = student.pocketmoney + amount;

//         // حفظ المصروف كـ Payment
//         await Payment.create({
//             studentId,
//             amount,
//             status: "paid"
//         });

//         // تحديث الرصيد
//         student.pocketmoney = newBalance;
//         await student.save();

//         res.status(200).json({ message: "Pocket money added successfully", pocketmoney: newBalance });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
