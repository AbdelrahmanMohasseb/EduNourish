const express = require("express");
const router = express.Router();
const teacherController = require("../teacher/controller/teacher.controller");
const { validateTeacher } = require('./teacherValidator');
const auth = require("../../middleware/auth");
const upload = require("../../middleware/multer"); 


router.post("/", teacherController.createTeacher);
router.get("/", teacherController.getAllTeachers);
router.get("/:id",auth(["advisor"]), teacherController.getTeacherById);
router.put("/:id", teacherController.updateTeacher);
router.put("/updatephoto/:id",upload.single("image"),teacherController.updateTeacherPhoto);
router.delete("/:id", teacherController.deleteTeacher);

module.exports = router;