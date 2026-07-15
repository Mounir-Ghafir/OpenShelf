"use client";

type FilterProps = {
  current: string;
  onFilter: (filter: string) => void;
};

export default function Filter({ current, onFilter }: FilterProps) {
  return (
    <div>
      <button
        onClick={() => onFilter("all")}
        style={{ fontWeight: current === "all" ? "bold" : "normal" }}
      >
        All
      </button>
      <button
        onClick={() => onFilter("available")}
        style={{ fontWeight: current === "available" ? "bold" : "normal" }}
      >
        Available
      </button>
      <button
        onClick={() => onFilter("borrowed")}
        style={{ fontWeight: current === "borrowed" ? "bold" : "normal" }}
      >
        Borrowed
      </button>
    </div>
  );
}