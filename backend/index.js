import express from "express";
import bodyParser from "body-parser";
import { createServer } from "http";
import morgan from "morgan";
import { MongoClient } from "mongodb";
import assert from "assert";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const url = "mongodb://localhost:27017/bookDB";
const connect = mongoose.connect(url);

connect.then(
  (db) => {
    console.log("Connected to server");
  },
  (err) => {
    console.log(err);
  }
);

import bookRouter from "./routes/bookRouter.js";

const hostname = "localhost";
const port = 3000;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

app.use("/books", bookRouter);
const server = createServer((req, res) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("Hello");
});

app.listen(port || 3000, () => {
  console.log(`Connected to backend on port ${port}`);
});

// app.use(function (err, req, res, next) {
//   res.locals.message = err.message;
//   // res.locals.error = req.app.get("env") === "development";

//   res.status(err.status || 500);
//   res.render("error");
// });
