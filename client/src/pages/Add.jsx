import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Link } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    ISBN: "",
    image: "",
    category: "",
    ratings: [],
  });

  const navigate = useNavigate();
  const handleChange = async (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const postBook = async (book1) => {
    console.log(`postBook. ${JSON.stringify(book1)}`);
    // e.preventDefault();
    try {
      let response = await axios.post("http://localhost:3000/books/", book1);
      console.log(response);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // var title = book.title;
      var title = book.title;
      // var author = book.author;
      var author = book.author;
      console.log(title);
      console.log(author);

      // var isbn = book.isbn;
      // console.log(title, author);
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q="${title}"+inauthor:${author}&maxResults=1`
      );
      console.dir(res.data.items[0].volumeInfo);
      var title_api = res.data.items[0].volumeInfo.title;
      var author_api = res.data.items[0].volumeInfo.authors[0];
      var image_api = res.data.items[0].volumeInfo.imageLinks
        ? res.data.items[0].volumeInfo.imageLinks.thumbnail
        : null;
      var category_api = res.data.items[0].volumeInfo.categories
        ? res.data.items[0].volumeInfo.categories[0]
        : "Δεν υπάρχει διαθέσιμη κατηγορία.";
      var isbn_api =
        res.data.items[0].volumeInfo.industryIdentifiers[0].identifier;
      // var isbn_api = "5555";

      var newBook = {
        title: title_api,
        author: author_api,
        ISBN: isbn_api,
        category: category_api,
        image: image_api,
      };

      postBook(newBook);
      navigate("/books");
    } catch (err) {
      console.error(err);
    }
  };

  // console.log(book.title);

  return (
    <div className="form" onChange={handleChange} Name="form">
      <h2>{JSON.stringify(book.title)}</h2>
      <h2>{JSON.stringify(book.author)}</h2>
      <h1>Πρόσθεσε ένα νέο βιβλίο</h1>
      <input
        type="text"
        placeholder="τίτλος"
        onChange={handleChange}
        name="title"
      />
      <input
        type="text"
        placeholder="συγγραφέας"
        onChange={handleChange}
        name="author"
      />
      <input
        type="text"
        placeholder="ISBN"
        onChange={handleChange}
        name="ISBN"
      />

      {/* <input
        type="text"
        placeholder="image"
        onChange={handleChange}
        name="image"
      />
      <input
        type="text"
        placeholder="category"
        onChange={handleChange}
        name="category"
      /> */}
      <div className="form-submit">
        <button className="add-btn" onClick={handleClick}>
          Add
        </button>
      </div>
    </div>
  );
};

export default Add;
