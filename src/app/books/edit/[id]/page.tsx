'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import BookForm from '@/components/BookForm';
import { Book } from '@/types/Book';

type BookFormData = {
  title: string;
  author: string;
  isbn: string;
  category: string;
  publicationYear: number;
  description: string;
};

export default function EditBookPage() {
  const router = useRouter();

  const params = useParams();
  const bookId = params.id;

  const [initialValues, setInitialValues] = useState<BookFormData | null>(null);
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBook() {
      try {
        const res = await fetch(`/api/books/${bookId}`);

        const data = await res.json();

        if (!res.ok) {
          setServerError(data.error);
          setIsLoading(false);
          return;
        }

        setInitialValues({
          title: data.title,
          author: data.author,
          isbn: data.isbn,
          category: data.category,
          publicationYear: data.publicationYear,
          description: data.description,
        });
      } catch (error) {
        setServerError('Failed to load book data.');
      } finally {
        setIsLoading(false);
      }
    }
    loadBook();
  }, [bookId]);

  async function handleUpdate(data: BookFormData) {
    setServerError('');

    try {
      const res = await fetch(`/api/books/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const result = await res.json();

        if (Array.isArray(result.error)) {
          setServerError(result.error[0].message);
        } else {
          setServerError(result.error);
        }
        return;
      }
      router.push(`/books/${bookId}`);
    } catch (error) {
      setServerError('Something went wrong. Please try again.');
    }
  }

  if (isLoading) {
    return <p className="loading-text">Loading...</p>;
  }

  if (!initialValues) {
    return (
      <div className="form-page">
        <h1 className="page-title">Edit Book</h1>
        <div className="server-error">{serverError || 'Book not found.'}</div>
      </div>
    );
  }

  return (
    <div className="form-page">
      <h1 className="page-title">Edit Book</h1>

      {serverError && <div className="server-error">{serverError}</div>}

      <BookForm initialValues={initialValues} onSubmit={handleUpdate} />
    </div>
  );
}
