import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 8000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

let users = {};

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    // ...
    socket.on("register", (userId) => {
      // console.log("register", userId);
      console.log(userId);
      users[userId] = { socketid: socket.id, online: true };
      io.emit("userStatusUpdate", users);
      console.log(users);
    });
    socket.on("joinRoom", (roomId) => {
      // console.log("register", userId);
      console.log(roomId);
      socket.join(roomId);
    });

    socket.on("chat message", ({ message, senderId, roomId }) => {
      console.log({ message, senderId, roomId });
      // console.log(users[receiverId]);
      io.to(roomId).emit("private", { message, senderId });
      // socket.emit("private", { message, senderId });
    });

    console.log("a user connected");
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
