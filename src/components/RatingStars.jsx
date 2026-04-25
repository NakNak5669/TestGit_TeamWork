import React from "react";

export default function RatingStars({ value = 0 }) {
  const full = Math.max(0, Math.min(5, Math.round(value)));
  const stars = "★★★★★☆☆☆☆☆".slice(5 - full, 10 - full); // trick: show full then empty
  return <span aria-label={`Rating ${full} out of 5`}>{stars}</span>;
}