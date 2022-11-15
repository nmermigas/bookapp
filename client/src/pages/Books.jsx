import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Books = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3000/books");
        setBooks(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);
  return (
    <div>
      <h1>All the books are the following</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book._id}>
            <h1>hi</h1>
            <h2>{book.title}</h2>
            <h3>{book.author}</h3>
            {book.image && <img src={book.image} alt=""></img>}
            {book.category && <h4>{book.category}</h4>}
            <h5>{book.ISBN}</h5>
          </div>
        ))}
      </div>
      <button className="add-btn">
        <Link to="/add">Add new Book</Link>
      </button>
    </div>
  );
};

export default Books;
