import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [error, setError] = useState(false);
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  console.log(book);
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/books", book);
      navigate("/books");
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <div className="form">
      <h1>Add New Book</h1>
      {/* title */}
      <input
        type="text"
        placeholder="title"
        onChange={handleChange}
        name="title"
      />
      {/* description */}
      <input
        type="text"
        placeholder="desc"
        onChange={handleChange}
        name="desc"
      />
      {/* price */}
      <input
        type="number"
        placeholder="price"
        onChange={handleChange}
        name="price"
      />
      {/* cover */}
      <input
        type="text"
        placeholder="cover"
        onChange={handleChange}
        name="cover"
      />
      {/* button */}
      <button className="formbutton" onClick={handleClick}>submit</button>
      {error && (
            <h3 className="text-red-500 text-sm">something went wrong</h3>
          )}
    </div>
  );
};

export default Add;
