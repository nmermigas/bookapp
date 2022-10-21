const mongooose = require("mongooose");
const Schema = mongooose.Schema;

const ratingSchema = new Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
  },
  author: { type: String },
});

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
    unique: true,
  },
  ISBN: {
    type: String,
    unique: true,
  },
  ratings: [ratingSchema],
});

var Books = mongooose.model("Book", bookSchema);
module.exports = Books;
