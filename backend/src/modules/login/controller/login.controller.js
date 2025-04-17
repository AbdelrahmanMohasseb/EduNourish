const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const {Student} = require("../../../../DB/models/index");
const {Teacher} = require("../../../../DB/models/index");
const {Parent} = require("../../../../DB/models/index");
const {Organizer} = require("../../../../DB/models/index");
const {Advisor} = require("../../../../DB/models/index");

const models = {
  student: Student,
  teacher: Teacher,
  parent: Parent,
  organizer: Organizer,
  advisor: Advisor,
};

const login = async (req, res) => {
  const { id, password } = req.body;

  try {
    let user = null;
    let role = null;

    for (const [key, model] of Object.entries(models)) {
      user = await model.findByPk(id);
      if (user) {
        role = key;
        break;
      }
    }

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ message: "Login successful", token, role });
  } catch (error) {
    res.status(500).json({ message: "Login error", error: error.message });
  }
};

module.exports = { login };
