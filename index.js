import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import booksRouter from "./src/routes/booksRouter.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

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

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
