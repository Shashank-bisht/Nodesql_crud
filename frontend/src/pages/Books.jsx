import React, { useEffect, useState } from "react";
import axios from "axios";
const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8080/books");
        // const data = await res.json()
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);
  return <div>Books</div>;
};

export default Books;
