import React from "react";
import "../styles/Filters.css";

export default function PriceRange({ min, max, value, onChange }) {
  return (
    <div className="range">
      <div className="range-row">
        <span className="muted">Max price</span>
        <strong>${value}</strong>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Max price"
      />

      <div className="range-row muted">
        <span>${min}</span>
        <span>${max}</span>
      </div>
    </div>
  );
}