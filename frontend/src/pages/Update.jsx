import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const location = useLocation();
  // accessing books using location
  const {book} = location.state
  const [title, settitle] = useState(book.title)
  const [desc, setdesc] = useState(book.desc)
  const [price, setprice] = useState(book.price)
  const [cover, setcover] = useState(book.cover)
  console.log(book)
  const [error, setError] = useState(false);

  // using useNavigate to get bookId
  const navigate = useNavigate();
  
  const bookId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    // extracting name , value from event
    const { name, value } = e.target;
    if (name === "title") settitle(value);
    if (name === "desc") setdesc(value);
    if (name === "price") setprice(value);
    if (name === "cover") setcover(value);
  };
  

  // console.log(books);
  const 
  
  
  handleClick = async (e) => {
    e.preventDefault();
    const updatedBook = {
      title: title,
      desc: desc,
      price: price,
      cover: cover
    };

    try {
      // or we can directly use book.id in place of bookId
      await axios.put("http://localhost:8080/books/" + bookId, updatedBook);
      navigate("/books");
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };
  
  return (
    <div className="form">
      <h1>Update New Book</h1>
      <input value={title}
        type="text"
        placeholder="title"
        onChange={handleChange}
        name="title"
      />
      <input value={desc}
        type="text"
        placeholder="desc"
        onChange={handleChange}
        name="desc"
      />
      <input value={price}
        type="number"
        placeholder="price"
        onChange={handleChange}
        name="price"
      />
      <input value={cover}
        type="text"
        placeholder="cover"
        onChange={handleChange}
        name="cover"
      />
      <button className="formbutton" onClick={handleClick}>
        Update
      </button>
      {error && (
            <h3 className="text-red-500 text-sm">something went wrong</h3>
          )}
    </div>
  );
};

export default Update;
