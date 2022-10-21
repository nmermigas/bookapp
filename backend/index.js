import express from "express";
import { createServer } from "http";
import morgan from "morgan";
import { json } from "body-parser";
const app = express();
import { MongoClient } from "mongodb";
import assert from "assert";
import { connect as _connect, connection } from "mongoose";

import Books, { find, remove } from "./models/books";

const url = "mongodb://localhost:27017/bookDB";
const connect = _connect(url);
// const dbname = "booksDB";

connect.then((db) => {
  console.log("Connected to MongoDB");

  var newBook = Books({
    title: "lol",
    auhtor: "askldjasd",
    ISBN: "2389472347890",
  });
  newBook
    .save()
    .then((book) => {
      console.log(book);

      return find({}).exec();
    })
    .then((books) => {
      console.log(books);
      return remove({});
    })
    .then(() => {
      return connection.close();
    })
    .catch((err) => {
      console.log(err);
    });
});

// MongoClient.connect(url, (err, client) => {
//   assert.equal(err, null);

//   console.log("connection established");

//   const db = client.db(dbname);
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

import bookRouter from "./routes/bookRouter";

const hostname = "localhost";
const port = 3000;

app.use(morgan("dev"));
app.use(json());

app.use("/books", bookRouter);
const server = createServer((req, res) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("Hello");
});

app.listen(port || 3000, () => {
  console.log(`Connected to bakcnet on port ${port}`);
});
