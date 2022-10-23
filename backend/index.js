import express from "express";
import bodyParser from "body-parser";
import { createServer } from "http";
import morgan from "morgan";
const app = express();
import { MongoClient } from "mongodb";
import assert from "assert";
import mongoose from "mongoose";

import Books from "./models/books.js";

const url = "mongodb://localhost:27017/bookDB";
const connect = mongoose.connect(url);

// const dbname = "booksDB";
connect.then(
  (db) => {
    console.log("Connected to server");
  },
  (err) => {
    console.log(err);
  }
);

// MongoClient.connect(url, (err, client) => {
//   assert.equal(err, null);

//   console.log("connection established");

//   const db = client.db(db);
//   const collection = db.collection("books");

//   collection.insertOne(
//     {
//       name: "'Είναι ο Καπιταλισμός, ηλίθιε'",
//       author: "¨Νίκος Μπογιόπουλος",
//     },
//     (err, result) => {
//       assert.equal(err, null);

//       console.log("After Insert:\n");
//       console.log(result.ops);

//       collection.find({}).toArray(err, (docs) => {
//         assert.equal(err, null);
//         console.log("Found:\n");
//         console.log(docs);
//       });
//     }
//   );
// });

import bookRouter from "./routes/bookRouter.js";

const hostname = "localhost";
const port = 3000;

app.use(morgan("dev"));
app.use(bodyParser.json());

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
