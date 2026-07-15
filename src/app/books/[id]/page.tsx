'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

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
  const bookId = params.id;

  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    async function loadBook() {
      try {
        const res = await fetch(`/api/books/${bookId}`);
        const data = await res.json();
        setBook(data);
      } catch (error) {
        console.error('Failed to fetch book:', error);
      }
    }

    loadBook();
  }, [bookId]);

  if (!book) {
    return <p className="loading-text">Loading...</p>;
  }

  return (
    <div className="book-detail">
      <div className="book-detail-card">
        <h1 className="book-detail-title">{book.title}</h1>

        <div className="book-detail-info">
          <div className="book-detail-row">
            <span className="book-detail-label">Author</span>
            <span className="book-detail-value">{book.author}</span>
          </div>
          <div className="book-detail-row">
            <span className="book-detail-label">ISBN</span>
            <span className="book-detail-value">{book.isbn}</span>
          </div>
          <div className="book-detail-row">
            <span className="book-detail-label">Category</span>
            <span className="book-detail-value">{book.category}</span>
          </div>
          <div className="book-detail-row">
            <span className="book-detail-label">Year</span>
            <span className="book-detail-value">{book.publicationYear}</span>
          </div>
          <div className="book-detail-row">
            <span className="book-detail-label">Status</span>
            <span className="book-detail-value">
              {book.available ? 'Available' : 'Borrowed'}
            </span>
          </div>
        </div>

        <div className="book-detail-description">
          <span className="book-detail-label">Description</span>
          <span className="book-detail-value">{book.description}</span>
        </div>
      </div>

      <Link href="/" className="back-link">
        &#8592; Back to Catalog
      </Link>
    </div>
  );
}
