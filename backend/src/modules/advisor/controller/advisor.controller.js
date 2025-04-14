const {Advisor} = require("../../../../DB/models/index");
const bcrypt = require("bcryptjs");


// ✅ Create an Advisor
exports.createAdvisor = async (req, res) => {
  try {
    const { id,userName, email, password, phoneNumber, photo, address, age, gender, schoolName, careerHistory } = req.body;
    // 🔹 Check if email already exists
    const existingAdvisor = await Advisor.findOne({ where: { email } });
    if (existingAdvisor) {
      return res.status(400).json({ message: "Email already in use!" });
    }

    // 🔹 Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const advisor = await Advisor.create({
      id,
      userName,
      email,
      password: hashedPassword, // Store encrypted password
      phoneNumber,
      photo,
      address,
      age,
      gender,
      schoolName,
      careerHistory,
    });

    res.status(201).json({ message: "Advisor created successfully!", advisor });
  } catch (error) {
    res.status(500).json({ message: "Error creating advisor", error: error.message });
  }
};

// ✅ Get All Advisors
exports.getAllAdvisors = async (req, res) => {
  try {
    const advisors = await Advisor.findAll();
    res.status(200).json(advisors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching advisors", error: error.message });
  }
};

// ✅ Get Advisor by ID
exports.getAdvisorById = async (req, res) => {
  try {
    const { id } = req.params;
    const advisor = await Advisor.findOne({ where: { id } });

    if (!advisor) return res.status(404).json({ message: "Advisor not found!" });

    res.status(200).json(advisor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching advisor", error: error.message });
  }
};

// ✅ Update Advisor
exports.updateAdvisor = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, email, phoneNumber, photo, address, age, gender, schoolName, careerHistory } = req.body;

    const advisor = await Advisor.findOne({ where: { id } });
    if (!advisor) return res.status(404).json({ message: "Advisor not found!" });

    await Advisor.update(
      { userName, email, phoneNumber, photo, address, age, gender, schoolName, careerHistory },
      { where: { id } }
    );

    res.status(200).json({ message: "Advisor updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating advisor", error: error.message });
  }
};

// ✅ Delete Advisor
exports.deleteAdvisor = async (req, res) => {
  try {
    const { id } = req.params;
    const advisor = await Advisor.findOne({ where: { id } });

    if (!advisor) return res.status(404).json({ message: "Advisor not found!" });

    await Advisor.destroy({ where: { id } });

    res.status(200).json({ message: "Advisor deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting advisor", error: error.message });
  }
};


