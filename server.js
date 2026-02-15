const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let books = [
  { "id": 1, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "genre": "Fiction", "copiesAvailable": 3 },
  { "id": 2, "title": "To Kill a Mockingbird", "author": "Harper Lee", "genre": "Southern Gothic Fiction", "copiesAvailable": 12 },
  { "id": 3, "title": "1984", "author": "George Orwell", "genre": "Dystopian Fiction", "copiesAvailable": 7 },
  { "id": 4, "title": "Stripped Down", "author": "Bunny XO", "genre": "Rated R", "copiesAvailable": 24 },
  { "id": 5, "title": "House The Long Lived King", "author": "Donna Terrace", "genre": "Comics", "copiesAvailable": 45 },
  { "id": 6, "title": "Dogman", "author": "Dav Pilkey", "genre": "Comics", "copiesAvailable": 100 }
];

// --- ROUTES ---

// 1. GET all books
app.get("/api/books", (req, res) => {
  res.json(books);
});

// 2. GET book by ID
app.get("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ message: "Book Not Found" });
  }
  res.json(book);
});

// 3. POST new book
app.post("/api/books", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    copiesAvailable: req.body.copiesAvailable
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// 4. PUT (Update) a book
app.put("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ message: "Book Not Found" });
  }

  // Update properties if they exist in the request body
  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;
  book.genre = req.body.genre || book.genre;
  book.copiesAvailable = req.body.copiesAvailable || book.copiesAvailable;

  res.json(book);
});

// 5. DELETE a book
app.delete("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);

  if (index === -1) {
    return res.status(404).json({ message: "Book Not Found" });
  }

  books.splice(index, 1); // Removes the book at that index
  res.json({ message: "Book deleted successfully" });
});

// --- START SERVER ---

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

module.exports = app;