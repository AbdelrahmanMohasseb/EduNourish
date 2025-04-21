const Notification = require("../models/Notification");
const { sendNotification } = require("../server");
const Parent = require("../models/Parent");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");

const notifyUsers = async (receiverId, senderId, message, type) => {
  await Notification.create({ receiverId, senderId, message, type });
  sendNotification(receiverId, { message, type });
};

// Add more roles if needed (e.g., Advisor, Organizer...)

const notifyEveryone = async (senderId, message, type) => {
  const roles = [Parent, Teacher, Student];

  for (const RoleModel of roles) {
    const users = await RoleModel.findAll({ attributes: ['id'] });

    for (const user of users) {
      await Notification.create({
        receiverId: user.id,
        senderId,
        message,
        type,
      });

      sendNotification(user.id, { message, type });
    }
  }
};


const notifyByModel = async (Model, senderId, message, type) => {
  const users = await Model.findAll({ attributes: ['id'] });

  for (const user of users) {
    await Notification.create({
      receiverId: user.id,
      senderId,
      message,
      type,
    });

    sendNotification(user.id, { message, type });
  }
};


await notifyUsers(parentId, advisorId, "Your advisor has sent you a message!", "advisorMessage");
await notifyEveryone(advisorId, "School trip is scheduled for next week!", "schoolEvent");
await notifyByModel(Parent, teacherId, "Your child has a new grade update", "gradeUpdate");
