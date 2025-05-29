const { Teacher, Subject,Advice,Attendance } = require("../../../../DB/models/index");
const bcrypt = require("bcryptjs");
const cloudinary = require("../../../../DB/config/cloudinary"); 



exports.createTeacher = async (req, res) => {
  try {
    console.log("🔍 Received data:", req.body); // 
    const { teacherID, username, email, password, phoneNumber,photo, address, age, gender, salary,SubjectID} = req.body;
    const existingTeacher = await Teacher.findOne({ where: { email } });
    if (existingTeacher) {
      return res.status(400).json({ message: "Email already in use!" });
    }
    // 🔹 Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newTeacher = await Teacher.create({
      teacherID,
      username,
      email,
      password:hashedPassword,
      phoneNumber,
      photo,
      address,
      age,
      gender,
      salary,
      SubjectID,

    });
    
    

    res.status(201).json({ success: true, data: newTeacher });
  } catch (error) {
    console.error("❌ Error creating teacher:", error);
    res.status(400).json({ success: false, error: error.message });
  }
};




exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.findAll();
    res.status(200).json({ success: true, data: teachers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({
      where: { teacherID: req.params.id },
      include: [
        {model: Advice},
        { model: Attendance },
        { model: Subject }
        // ,as: 'students' // Optional: Specify the alias for the association
      ]
    })
    
    if (!teacher) {
      return res.status(404).json({ success: false, message: "Teacher not found" });
    }
    res.status(200).json({ success: true, data: teacher });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id);
    if (!teacher) {
      return res.status(404).json({ success: false, message: "Teacher not found" });
    }
    await teacher.update(req.body);
    res.status(200).json({ success: true, data: teacher });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
exports.updateTeacherPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    let { photo} = req.body;

    const teacher = await Teacher.findOne({ where: { teacherID:id } });
    if (!teacher) return res.status(404).json({ message: "Advisor not found!" });
    if (req.file) {
      const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
          folder: `EduNourish/teacher/${teacher.teacherID}`
      });
      photo = cloudinaryResult.secure_url;
    };
    console.log("photo:",photo)

    await Teacher.update(
      {  photo },
      { where: { teacherID:id } }
    );

    res.status(200).json({ message: "teacher updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating teacher", error: error.message });
  }
};



exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id);
    if (!teacher) {
      return res.status(404).json({ success: false, message: "Teacher not found" });
    }
    await teacher.destroy();
    res.status(200).json({ success: true, message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};