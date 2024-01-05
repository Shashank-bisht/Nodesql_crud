import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8080/books");
        // const data = await res.json()
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);
 
  const handleDelete = async (id)=>{
      try {
        await axios.delete(`http://localhost:8080/books/${id}`);
        window.location.reload();
      } catch (error) {
        console.log(error)
      }
  }

  return <div>
    <h1>Shanky</h1>
    <div className="books">
        {books.map((book) => (
            <div className="book" key={book.id}>
            {book.cover &&<img src={book.cover} alt="" />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price}</span>
            <button className="delete" onClick={()=>handleDelete(book.id)}>Delete</button>
            <button className="update">Update</button>
            </div>  
        ))}
    </div>
    <button className="btn"><Link className="link" to="/add">Add new book</Link></button>
  </div>;
};

export default Books;
