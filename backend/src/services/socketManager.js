const { Server } = require("socket.io");
const {  Notification } = require("../../DB/models/index");

class SocketManager {
  constructor() {
    this.io = null;
    this.connectedParents = new Map(); // Store parent connections
  }

  initialize(server) {
    this.io = new Server(server, {
      cors: '*'
    });

    this.io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);

      // Handle user identification (optional - can be sent from client)
      socket.on("identify_user", (userData) => {
        socket.userId = userData.userId;
        socket.userType = userData.userType; // 'parent', 'teacher', etc.
        
        console.log(`User identified: ${socket.userId} (${socket.userType})`);
        
        // Store parent connections
        if (socket.userType === "parent") {
          this.connectedParents.set(socket.userId, socket.id);
        }
      });

      // Handle parent joining their room
      socket.on("join_parent_room", (parentId) => {
        socket.join(`parent_${parentId}`);
        console.log(`Parent ${parentId} joined their room`);
      });

      // Handle disconnection
      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        if (socket.userType === "parent" && socket.userId) {
          this.connectedParents.delete(socket.userId);
        }
      });

      // Mark notifications as read
      socket.on("mark_notification_read", async ({ notificationId, parentId }) => {
        try {
          // Note: You'll need to import your Notification model
          // const { Notification } = require("path/to/your/models");
           console.log(`Marking read for notification ${notificationId} from user ${parentId}`);


          await Notification.update(
            { isRead: true },
            { where: { id: notificationId, parentId } } // تأكيد أنه يخصه
        );

        } catch (error) {
          console.error("Error marking notification as read:", error);
        }
      });
    });
  }

  // Send notification to specific parent
  sendNotificationToParent(parentId, notification) {
    if (this.io) {
      this.io.to(`parent_${parentId}`).emit("new_notification", notification);
      console.log(`Notification sent to parent ${parentId}:`, notification.title);
    }
  }

  // Send notification to all connected parents
  broadcastNotification(notification) {
    if (this.io) {
      this.io.emit("broadcast_notification", notification);
    }
  }

  getConnectedParents() {
    return Array.from(this.connectedParents.keys());
  }
}

// Export singleton instance
module.exports = new SocketManager();