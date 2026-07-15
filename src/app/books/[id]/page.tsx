"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link"

type Book = {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  publicationYear: number;
  description: string;
  available: boolean;
};

export default function BookDetailsPage() {
    const params = useParams();
    const bookId = params.id

    const [book , setBook] = useState<Book | null>(null);

    useEffect(() => {
        async function loadBook() {
            try {
                const res = await fetch(`/api/books/${bookId}`)
                const data = await res.json();

                setBook(data);
            } catch (error) {
                console.error("Failed to fetch book:", error);
            }
        }

        loadBook();
    } , [bookId])

    if (!book) {
        return <p>Loading...</p>;
    }

    return (
    <div>
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>ISBN: {book.isbn}</p>
      <p>Category: {book.category}</p>
      <p>Year: {book.publicationYear}</p>
      <p>Description: {book.description}</p>
      <p>Status: {book.available ? "Available" : "Borrowed"}</p>
      <Link href="/">Back to Catalog</Link>
    </div>
  );
}