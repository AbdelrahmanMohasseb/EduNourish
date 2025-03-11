const express = require("express");
const router = express.Router();
const timetableController = require("./controller/timetable.controller");

router.post("/", timetableController.addTimetable);
router.get("/:id", timetableController.getTimetableByStudent);
router.put("/:id", timetableController.updateTimetable);
router.delete("/:id", timetableController.deleteTimetable);

module.exports = router;
