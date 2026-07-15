'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BookForm from '@/components/BookForm';

type BookFormData = {
  title: string;
  author: string;
  isbn: string;
  category: string;
  publicationYear: number;
  description: string;
};

export default function AddBookPage() {
  const router = useRouter();

  const [serverError, setServerError] = useState('');

  async function handleCreate(data: BookFormData) {
    setServerError('');

    try {
      const res = await fetch('/api/books', {
        method: 'POST',
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
      router.push('/');
    } catch (error) {
      setServerError('Something went wrong. Please try again.');
    }
  }
  return (
    <main>
      <h1>Add a New Book</h1>

      {serverError && <p>{serverError}</p>}

      <BookForm onSubmit={handleCreate} />
    </main>
  );
}
