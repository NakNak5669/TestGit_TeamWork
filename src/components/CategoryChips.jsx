import React from "react";
import "../styles/Filters.css";

export default function CategoryChips({ categories, value, onChange }) {
  return (
    <div className="chips" role="list" aria-label="Categories">
      {categories.map((c) => (
        <button
          key={c}
          type="button"
          className={c === value ? "chip active" : "chip"}
          onClick={() => onChange(c)}
          role="listitem"
        >
          {c}
        </button>
      ))}
    </div>  
  );
}