const {Notification} = require("../../../../DB/models/index");
const { Op } = require("sequelize");

// Send notification (Save in DB & Emit via Socket.io)
exports.sendNotification = async (req, res) => {
  try {
    const { receiverId, senderId, message, type } = req.body;

    const notification = await Notification.create({
      receiverId,
      senderId,
      message,
      type,
    });

    // Emit to Socket.io
    const { sendNotification } = require("../server"); // Import function
    sendNotification(receiverId, notification);

    res.status(201).json({ message: "Notification sent successfully!", notification });
  } catch (error) {
    res.status(500).json({ message: "Error sending notification", error: error.message });
  }
};

// Get all notifications for a user
exports.getUserNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.findAll({ where: { receiverId: userId } });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error: error.message });
  }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByPk(id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    await notification.update({ isRead: true });
    res.status(200).json({ message: "Notification marked as read", notification });
  } catch (error) {
    res.status(500).json({ message: "Error updating notification", error: error.message });
  }
};
