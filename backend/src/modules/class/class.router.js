// routes/classRoutes.js
const express = require("express");
const router = express.Router();
const classController = require("../../../src/modules/class/controller/class.controller");

// إنشاء فصل
router.post("/", classController.createClass);

router.get("/",classController.getAllClasses);

router.get("/:id",classController.getClassById);

router.put("/:id", classController.updateClass);

router.delete("/:id",classController.deleteClass);

router.get("/:classId/students", classController.getStudentsByClass);

module.exports = router;