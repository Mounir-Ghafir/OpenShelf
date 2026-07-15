import Link from 'next/link';

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  publicationYear: number;
  available: boolean;
};

type BookCardProps = {
  book: Book;
  onDelete: (bookId: string) => void;
};

export default function BookCard({ book, onDelete }: BookCardProps) {
  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${book.title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/books/${book._id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!result.message) {
        alert(result.error || 'Failed to delete the book.');
        return;
      }

      onDelete(book._id);
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  }

  return (
    <div>
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Category: {book.category}</p>
      <p>Year: {book.publicationYear}</p>
      <p>Status: {book.available ? 'Available' : 'Borrowed'}</p>
      <Link href={`/books/${book._id}`}>View Details</Link>
      <Link href={`/books/edit/${book._id}`}>Edit</Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
