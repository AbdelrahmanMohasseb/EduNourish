const express = require("express");
const router = express.Router();
const {
  sendNotification,
  getUserNotifications,
  markAsRead,
} = require("../notification/controller/notification.controller");

router.post("/", sendNotification);
router.get("/:userId", getUserNotifications);
router.put("/:id/read", markAsRead);

module.exports = router;
