const { Teacher } = require("../../../../DB/models/index");



exports.createTeacher = async (req, res) => {
  try {
    console.log("🔍 Received data:", req.body); // 
    const { teacherID, username, email, password, phoneNumber, address, age, gender, salary,SubjectID} = req.body;

    if (!teacherID || !username || !email || !password|| !phoneNumber|| !address|| !age|| !gender|| !salary ) 
      {
return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const newTeacher = await Teacher.create({
      teacherID,
      username,
      email,
      password,
      phoneNumber,
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
    const teacher = await Teacher.findByPk(req.params.id,{
      include: [
        {model: Advice},
        { model: Exam },
        { model: Attendance }
        // ,as: 'students' // Optional: Specify the alias for the association
      ]});
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