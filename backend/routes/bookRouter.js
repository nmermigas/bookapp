import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import Books from "../models/books.js";

const bookRouter = express.Router();

bookRouter.use(bodyParser.json());

bookRouter.route("/").get((req, res, next) => {
  res.json("Hello, this is the route: books");
  next();
});

bookRouter.route("/:bookId").get((req, res, next) => {
  res.json("Hello, this is the book with the id: " + req.params.bookId);
  next();
});

bookRouter.route("/:bookId").post((req, res, next) => {
  res.json("Adding the following book: " + req.params.bookId);
  next();
});

bookRouter.route("/:bookId").put((req, res, next) => {
  res.json("Updating the following book: " + req.params.bookId);
});

bookRouter.route("/:bookId").delete((req, res, next) => {
  res.json("Deleting the following book: " + req.params.bookId);
});

export default bookRouter;
