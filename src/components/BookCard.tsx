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

const cardColors = [
  'color-red',
  'color-green',
  'color-blue',
  'color-gold',
  'color-wood',
];

function getColorClass(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return cardColors[Math.abs(hash) % cardColors.length];
}

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
    <div className={`book-card ${getColorClass(book._id)}`}>
      <div className="book-card-header">
        <h2 className="book-card-title">{book.title}</h2>
        <span
          className={`book-status-badge ${book.available ? 'available' : 'borrowed'}`}
        >
          {book.available ? 'Available' : 'Borrowed'}
        </span>
      </div>

      <p className="book-card-meta">
        by <span>{book.author}</span>
      </p>
      <p className="book-card-meta">
        Year: <span>{book.publicationYear}</span>
      </p>
      <span className="book-card-category">{book.category}</span>

      <div className="book-card-actions">
        <Link href={`/books/${book._id}`} className="action-view">
          View Details
        </Link>
        <Link href={`/books/edit/${book._id}`} className="action-edit">
          Edit
        </Link>
        <button onClick={handleDelete} className="action-delete">
          Delete
        </button>
      </div>
    </div>
  );
}
