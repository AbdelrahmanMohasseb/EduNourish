const express = require("express");
const attendanceController = require("../attendance/controller/attedance.controller");

const router = express.Router();

router.post("/", attendanceController.createAttendance);
router.get("/", attendanceController.getAllAttendance);
router.get("/:id", attendanceController.getAttendanceById);
router.put("/:id", attendanceController.updateAttendance);
router.delete("/:id", attendanceController.deleteAttendance);

module.exports = router;