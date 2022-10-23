import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import Books from "../models/books.js";

const bookRouter = express.Router();

bookRouter.use(bodyParser.json());

//route("/")
bookRouter
  .route("/")
  .get((req, res, next) => {
    Books.find({}).then((books) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(books); //puts it into the body of the reply
    }),
      (err) => next(err).catch((err) => next(err));
  })
  .post((req, res, next) => {
    Books.create(req.body)
      .then(
        (book) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(book);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  // put operation not supported for ("/") endpoint.
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("put operation not supported for '/bookId' endpoint");
  })
  .delete((req, res, next) => {
    Books.remove({})
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

// route("/:bookId")
bookRouter
  .route("/:bookId")
  .get((req, res, next) => {
    Books.findById(req.params.bookId)
      .then(
        (book) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(book); //puts it into the body of the reply
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  //post operation not supported for ("/bookId") endpoint
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("post operation not supported for '/bookId' endpoint");
  })

  .put((req, res, next) => {
    Books.findByIdAndUpdate(
      req.params.bookId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (book) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(book); //puts it into the body of the reply
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .delete((req, res, next) => {
    res.json("Deleting the following book: " + req.params.bookId);
    Books.findByIdAndRemove(req.params.bookId)
      .then(
        (resp) => {
          res.statusCode = 200;
          es.setHeader("Content-Type", "application/json");
          res.json(books); //puts it into the body of the reply
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });
export default bookRouter;
