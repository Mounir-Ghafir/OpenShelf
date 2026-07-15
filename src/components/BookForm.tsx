'use client';

import { useState } from 'react';
import { bookShema } from '@/lib/validators';

type BookFormData = {
  title: string;
  author: string;
  isbn: string;
  category: string;
  publicationYear: number;
  description: string;
};

type BookFormProps = {
  initialValues?: BookFormData;
  onSubmit: (data: BookFormData) => void;
};

export default function BookForm({ initialValues, onSubmit }: BookFormProps) {
  const [formData, setFormData] = useState<BookFormData>(
    initialValues || {
      title: '',
      author: '',
      isbn: '',
      category: '',
      publicationYear: 2024,
      description: '',
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: name === 'publicationYear' ? Number(value) : value,
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const result = bookShema.safeParse(formData);

    if (!result.success) {
      const newErrors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        newErrors[issue.path[0] as string] = issue.message;
      });

      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(result.data);
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <span className="field-error">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
        {errors.author && <span className="field-error">{errors.author}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="isbn">ISBN</label>
        <input
          type="text"
          id="isbn"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
        />
        {errors.isbn && <span className="field-error">{errors.isbn}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
        {errors.category && (
          <span className="field-error">{errors.category}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="publicationYear">Publication Year</label>
        <input
          type="number"
          id="publicationYear"
          name="publicationYear"
          value={formData.publicationYear}
          onChange={handleChange}
        />
        {errors.publicationYear && (
          <span className="field-error">{errors.publicationYear}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && (
          <span className="field-error">{errors.description}</span>
        )}
      </div>

      <button type="submit" className="form-submit">
        Save Book
      </button>
    </form>
  );
}
