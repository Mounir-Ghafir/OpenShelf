"use client";

import { useState, useEffect } from "react";
import BookCard from "@/components/BookCard";
import SearchBar from "@/components/SearchBar";
import Filter from "@/components/Filter";

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  publicationYear: number;
  available: boolean;
};

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    async function loadBooks() {
      try {
        const res = await fetch("/api/books");
        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    }
    loadBooks();
  }, []);

  function handleDelete(bookId: string) {
    setBooks((previousBooks) =>
      previousBooks.filter((book) => book._id !== bookId)
    );
  }

  const filteredBooks = books.filter((book) => {
    const query = searchQuery.toLowerCase();
    const title = book.title.toLowerCase();
    const author = book.author.toLowerCase();
    const matchesSearch = title.includes(query) || author.includes(query);

    let matchesFilter = true;
    if (filterStatus === "available") {
      matchesFilter = book.available === true;
    } else if (filterStatus === "borrowed") {
      matchesFilter = book.available === false;
    }

    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <h1>OpenShelf</h1>

      <SearchBar query={searchQuery} onSearch={setSearchQuery} />

      <Filter current={filterStatus} onFilter={setFilterStatus} />

      <div>
        {filteredBooks.map((book) => (
          <BookCard key={book._id} book={book} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}