import React, { useState, useEffect } from "react";
import BookCard from "../components/BookCard";

const Book = () => {
  const [books, setBooks] = useState([]);

  // Fetch books from the database
  useEffect(() => {
    // Fetch logic here (e.g., using fetch or axios)
    // Update the books state with fetched data
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/book"); // Assuming your backend route for fetching books is /api/books
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Books</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Book;
