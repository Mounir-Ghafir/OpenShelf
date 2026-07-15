'use client';

type FilterProps = {
  current: string;
  onFilter: (filter: string) => void;
};

export default function Filter({ current, onFilter }: FilterProps) {
  return (
    <div className="filter-bar">
      <button
        className={`filter-btn${current === 'all' ? ' active' : ''}`}
        onClick={() => onFilter('all')}
      >
        All
      </button>
      <button
        className={`filter-btn${current === 'available' ? ' active' : ''}`}
        onClick={() => onFilter('available')}
      >
        Available
      </button>
      <button
        className={`filter-btn${current === 'borrowed' ? ' active' : ''}`}
        onClick={() => onFilter('borrowed')}
      >
        Borrowed
      </button>
    </div>
  );
}
