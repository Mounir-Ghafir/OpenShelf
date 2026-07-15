'use client';

type SearchBarProps = {
  query: string;
  onSearch: (query: string) => void;
};

export default function SearchBar({ query, onSearch }: SearchBarProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onSearch(event.target.value);
  }

  return (
    <div className="search-container">
      <label htmlFor="search" className="search-label">
        Search by title or author
      </label>
      <input
        type="text"
        id="search"
        className="search-input"
        placeholder="Type to search..."
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}
