import express from "express";
import { connect } from "./database.js";
import dotenv from "dotenv";
import router from "./Routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config({
  path: "./.env",
});

connect();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());


app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(4000, () => {
  console.log("Example app listening on port 4000!");
});
