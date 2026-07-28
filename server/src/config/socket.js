const { Server } = require('socket.io');

let io;
const connectedUsers = new Map(); // The "Phonebook"

const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] }
  });

  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      connectedUsers.set(String(userId), socket.id);
      console.log(`📡 User ${userId} connected`);
    }

    socket.on('disconnect', () => {
      if (userId) connectedUsers.delete(String(userId));
    });
  });
};

const emitToUser = (userId, eventName, data) => {
  const socketId = connectedUsers.get(String(userId));
  if (socketId && io) {
    io.to(socketId).emit(eventName, data); // Push directly to this user!
    return true;
  }
  return false;
};

module.exports = { initSocket, emitToUser };
