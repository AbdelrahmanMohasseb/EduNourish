const sequelize = require('../config/connectDB');
const Student=require("./student");
const Bus=require("./bus")
const Signup=require("./studentsignup")
// Optional: Sync database (only in development)
sequelize.sync({ alter: true })
  .then(() => console.log("Database synchronized"))
  .catch((err) => console.error("Database synchronization error:", err));

module.exports = {
  sequelize,
  Student,
  Bus,
  Signup
};