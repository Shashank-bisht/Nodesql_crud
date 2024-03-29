const db = require("./connection");
const express = require("express");
const app = express();
// const bodyParser = require('body-parser');
const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT","DELETE"],
    credentials: true,
  })
);
app.use(express.json());
// app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.json("<h1>Hello</h1>");
});

// get all books
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// delete particular books
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// update book data 
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  if (!req.body.title || !req.body.desc || !req.body.price || !req.body.cover) {
    return res.status(400).json(error);
  }
  const q = "UPDATE books SET `title`=?,`desc`=?,`price`=?,`cover`=? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  // destructuring according to query
  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// adding books
app.post("/books", (req, res) => {
  if (!req.body.title || !req.body.desc || !req.body.price || !req.body.cover) {
    return res.status(400).json(error);
  }
  const q = "INSERT INTO books (`title`,`desc`,`price`, `cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  // .query is used to run sql query
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(8080, () => {
  console.log("server running");
});
