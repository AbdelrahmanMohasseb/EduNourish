const express = require("express");
const router = express.Router();
const controller = require("../classteacher/controller/classteacher.controller");

router.post("/assign", controller.assignTeacherToClass);
router.get("/by-class/:classId", controller.getTeachersByClass);
router.get("/by-teacher/:teacherId", controller.getClassesByTeacher);

module.exports = router;