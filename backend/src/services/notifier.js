const { sendNotification } = require("../server");

const notifyUsers = async (receiverId, senderId, message, type) => {
  await Notification.create({ receiverId, senderId, message, type });
  sendNotification(receiverId, { message, type });
};

await notifyUsers(parentId, advisorId, "Your advisor has sent you a message!", "advisorMessage");