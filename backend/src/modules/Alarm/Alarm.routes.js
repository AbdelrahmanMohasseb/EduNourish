const express = require("express");
const router = express.Router();
const AlarmController = require("../Alarm/controller/Alarm.controller");

router.post("/", AlarmController.createAlarm);
router.get("/", AlarmController.getAllAlarms);
router.get("/:receiverType/:receiverId", AlarmController.getAlarmsByReceiver);
router.put("/:id/read", AlarmController.markAlarmAsRead);
router.delete("/:id", AlarmController.deleteAlarm);

module.exports = router;
