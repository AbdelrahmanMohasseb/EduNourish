const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const {Student} = require("../../DB/models/index");
const {Teacher} = require("../../DB/models/index");
const {Parent} = require("../../DB/models/index");
const {Organizer} = require("../../DB/models/index");
const {Advisor} = require("../../DB/models/index");

const models = {
  student: Student,
  teacher: Teacher,
  parent: Parent,
  organizer: Organizer,
  advisor: Advisor,
};

const auth = (allowedRoles = []) => {
  return async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;

      let user = null;
      let role = null;

      for (const [key, model] of Object.entries(models)) {
        user = await model.findByPk(userId);
        if (user) {
          role = key;
          break;
        }
      }

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // Authorization: Check if user role is in allowed roles
      if (allowedRoles.length && !allowedRoles.includes(role)) {
        return res.status(403).json({ message: "Access Denied. Not authorized." });
      }

      req.user = { ...user.dataValues, role }; // Attach user data and role
      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid Token", error: error.message });
    }
  };
};

module.exports = auth;













