import mongoose from "mongoose";
const Schema = mongoose.Schema;

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

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
    ISBN: {
      type: String,
      unique: true,
      required: true,
    },
    image: { type: String },
    category: { type: String },
    ratings: [ratingSchema],
  },
  { timestamps: true },
  {
    versionKey: false,
  }
);

var Books = mongoose.model("Book", bookSchema);
export default Books;
