const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const sequelize = require("./config/connectDB");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Update with your frontend URL
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// Store online users
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("registerUser", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    for (let [key, value] of onlineUsers.entries()) {
      if (value === socket.id) {
        onlineUsers.delete(key);
        break;
      }
    }
  });
});

// Function to send notifications
const sendNotification = (receiverId, notification) => {
  const receiverSocket = onlineUsers.get(receiverId);
  if (receiverSocket) {
    io.to(receiverSocket).emit("newNotification", notification);
  }
};

app.use("/api/notifications", notificationRoutes);

server.listen(5000, async () => {
  console.log("Server running on port 5000");
  await sequelize.sync();
});
