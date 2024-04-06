import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import booksRouter from "./src/routes/booksRouter.js";
import notifcationsRouter from "./src/routes/notificationsRouter.js";
import usersRouter from "./src/routes/usersRouter.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    //origin: "http://localhost:3000",
    origin: "*",
    //methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.io = io;

const port = process.env.PORT || 3000;
const databaseUrl = process.env.MONGO_DB_URL;

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB: ", err);
});

mongoose.connect(databaseUrl + "BookExchange", {
  useNewUrlParser: true,
});

app.use("/books", booksRouter);
app.use("/notifications", notifcationsRouter);
app.use("/users", usersRouter);

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});