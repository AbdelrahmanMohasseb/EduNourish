const express = require("express");
const router = express.Router();
const NotificationController = require("../notification/controller/notification.controller");


router.get("/:id", NotificationController.getNotifications);
router.put("/:notificationId/read",  NotificationController.markAsRead);
router.get("/unread-count/:id",  NotificationController.getUnreadCount);

module.exports = router;
