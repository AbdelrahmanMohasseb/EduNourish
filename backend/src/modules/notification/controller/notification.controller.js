const NotificationService = require("../../../services/notificationService");

class NotificationController {
  
  // Get notifications for logged-in parent
  async getNotifications(req, res) {
    try {
      const parentId = req.params.id; 
      const { page = 1, limit = 20 } = req.query;

      const result = await NotificationService.getParentNotifications(
        parentId, 
        parseInt(page), 
        parseInt(limit)
      );

      res.status(200).json({
        success: true,
        data: result
      });

    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message
      });
    }
  }

  // Mark notification as read
  async markAsRead(req, res) {
    try {
      const { notificationId } = req.params;
      const parentId = req.user.id;

      const updated = await NotificationService.markAsRead(notificationId, parentId);

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: "Notification not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "Notification marked as read"
      });

    } catch (error) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message
      });
    }
  }

  // Get unread count
  async getUnreadCount(req, res) {
    try {
      const parentId = req.params.id;
      const count = await NotificationService.getUnreadCount(parentId);

      res.status(200).json({
        success: true,
        data: { unreadCount: count }
      });

    } catch (error) {
      console.error("Error getting unread count:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message
      });
    }
  }
}

module.exports = new NotificationController();