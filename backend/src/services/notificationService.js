const { Student, Notification ,Parent} = require("../../DB/models/index");

const socketManager = require("../services/socketManager.js");

class NotificationService {
  
  // Create and send attendance notification
  async createAttendanceNotification(attendanceData) {
    try {
      console.log(attendanceData.studentId)
     
      // Get student and parent information
      const student = await Student.findByPk(attendanceData.studentId, {
        include: [{
          model: Parent,
        }]
      });
      console.log(student)
      console.log(student.parent)
      console.log(student.parentId)

      if (!student ) {
        throw new Error("Student or parent not found");
      }

      // Create notification message based on attendance status
      const messages = {
        present: `Good news! ${student.userName} was present in class today.`,
        absent: `${student.userName} was absent from class today. Please check with your child.`,
        late: `${student.userName} arrived late to class today.`,
        excused: `${student.userName} had an excused absence today.`
      };

      const titles = {
        present: "✅ Present Today",
        absent: "❌ Absent Today", 
        late: "⏰ Late Arrival",
        excused: "📋 Excused Absence"
      };

      // Create notification in database
      const notification = await Notification.create({
        type: "attendance",
        title: titles[attendanceData.status],
        message: messages[attendanceData.status],
        parentId: student.parentId,
        studentId: student.id,
        attendanceId: attendanceData.id
      });

      // Send real-time notification via Socket.IO
      const notificationData = {
        id: notification.id,
        type: notification.type,
        title: notification.title,
        message: notification.message,
        studentName: student.userName,
        date: attendanceData.date,
        status: attendanceData.status,
        isRead: false,
        createdAt: notification.createdAt
      };

      socketManager.sendNotificationToParent(student.parentId, notificationData);

      return notification;
    } catch (error) {
      console.error("Error creating attendance notification:", error);
      throw error;
    }
  }

  // Get all notifications for a parent
  async getParentNotifications(parentId, page = 1, limit = 20) {
    try {
      const offset = (page - 1) * limit;
      
      const { count, rows } = await Notification.findAndCountAll({
        where: { parentId },
        include: [
          {
            model: Student,
            attributes: ['id', 'userName', 'photo']
          }
        ],
        order: [['createdAt', 'DESC']],
        limit,
        offset
      });

      return {
        notifications: rows,
        totalCount: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        hasMore: offset + rows.length < count
      };
    } catch (error) {
      console.error("Error fetching parent notifications:", error);
      throw error;
    }
  }

  // Mark notification as read
  async markAsRead(notificationId, parentId) {
    try {
      const [updatedRows] = await Notification.update(
        { isRead: true },
        { 
          where: { 
            id: notificationId, 
            parentId: parentId 
          } 
        }
      );
      return updatedRows > 0;
    } catch (error) {
      console.error("Error marking notification as read:", error);
      throw error;
    }
  }

  // Get unread count for parent
  async getUnreadCount(parentId) {
    try {
      const count = await Notification.count({
        where: { 
          parentId: parentId, 
          isRead: false 
        }
      });
      return count;
    } catch (error) {
      console.error("Error getting unread count:", error);
      throw error;
    }
  }
}

module.exports = new NotificationService();