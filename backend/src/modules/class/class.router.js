// routes/classRoutes.js
const express = require("express");
const router = express.Router();
const classController = require("./controller/class.controller");

// إنشاء فصل
router.post("/", classController.createClass);

// الحصول على جميع الفصول
router.get("/",classController.getAllClasses);

// الحصول على فصل بواسطة ID
router.get("/:id",classController.getClassById);

// تحديث فصل
router.put("/:id", classController.updateClass);

// حذف فصل
router.delete("/:id",classController.deleteClass);

module.exports = router;