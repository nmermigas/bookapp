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
      <div className="title">
        <h1>All the books are the following</h1>
      </div>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book._id}>
            <h2>{book.title}</h2>
            <h3>{book.author}</h3>
            {book.image && <img src={book.image} alt=""></img>}
            {book.category && <h5>{book.category}</h5>}
            <h6>{book.ISBN}</h6>
          </div>
        ))}
        <div className="btn">
          <button className="add-btn">
            <Link to="/add">Add new Book</Link>
          </button>
        </div>
      </div>
      <div>
        {/* <button className="add-btn">
          <Link to="/add">Add new Book</Link>
        </button> */}
      </div>
    </div>
  );
};

export default Books;
