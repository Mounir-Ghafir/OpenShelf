"use client";

type SearchBarProps = {
  query: string;
  onSearch: (query: string) => void;
};


export default function SearchBar({ query, onSearch }: SearchBarProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onSearch(event.target.value);
  }

  return (
    <div>
      <label htmlFor="search">Search by title or author</label>
      <input
        type="text"
        id="search"
        placeholder="Type to search..."
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}