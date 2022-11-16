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
  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/books", book);
      navigate("/books");
    } catch (err) {}
  };

  console.log(book);
  return (
    <div className="form" classonChange={handleChange} Name="form">
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
