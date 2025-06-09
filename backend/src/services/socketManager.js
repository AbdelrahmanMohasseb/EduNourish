const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

class SocketManager {
  constructor() {
    this.io = null;
    this.connectedParents = new Map(); // Store parent connections
  }

  initialize(server) {
    this.io = new Server(server, {
      cors: {
        origin: process.env.CLIENT_URL || "http://127.0.0.1:5500/index.html",
        methods: ["GET", "POST"]
      }
    });

    // Authentication middleware for socket connections
    this.io.use((socket, next) => {
      try {
        const token = socket.handshake.auth.token;
        if (!token) {
          return next(new Error("Authentication error"));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.id;
        socket.userType = decoded.userType; // 'parent', 'teacher', etc.
        next();
      } catch (err) {
        next(new Error("Authentication error"));
      }
    });

    this.io.on("connection", (socket) => {
      console.log(`User connected: ${socket.userId} (${socket.userType})`);

      // Store parent connections
      if (socket.userType === "parent") {
        this.connectedParents.set(socket.userId, socket.id);
      }

      // Handle parent joining their room
      socket.on("join_parent_room", (parentId) => {
        socket.join(`parent_${parentId}`);
        console.log(`Parent ${parentId} joined their room`);
      });

      // Handle disconnection
      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.userId}`);
        if (socket.userType === "parent") {
          this.connectedParents.delete(socket.userId);
        }
      });

      // Mark notifications as read
      socket.on("mark_notification_read", async (notificationId) => {
        try {
          await Notification.update(
            { isRead: true },
            { where: { id: notificationId, parentId: socket.userId } }
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