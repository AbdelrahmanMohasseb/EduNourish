const express = require("express");
const attendanceController = require("./controller/attendance.controller");
const { validateAttendance } = require('./attendanceValidator');

const router = express.Router();

router.post("/", attendanceController.createAttendance);
router.get("/", attendanceController.getAllAttendance);
router.get("/:id", attendanceController.getAttendanceById);
router.put("/:id", validateAttendance,attendanceController.updateAttendance);
router.delete("/:id", attendanceController.deleteAttendance);

module.exports = router;