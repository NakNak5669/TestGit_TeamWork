import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";
import "../styles/ProductCard.css";

export default function ProductCard({ product, onAdd }) {
  return (
    <article className="card">
      <Link to={`/products/${product.id}`} className="card-media">
        <img src={product.images?.[0]} alt={product.title} loading="lazy" />
      </Link>

      <div className="card-body">
        <div className="card-top">
          <span className="pill">{product.category}</span>
          <span className="rating">
            <RatingStars value={product.rating} />
          </span>
        </div>

        <Link to={`/products/${product.id}`} className="card-title">
          {product.title}
        </Link>

        <p className="card-desc">{product.description}</p>

        <div className="card-bottom">
          <div className="price">${product.price.toFixed(2)}</div>
          <button className="btn btn-ghost" onClick={() => onAdd(product)}>
            + Add
          </button>
        </div>
      </div>
    </article>
  );
}