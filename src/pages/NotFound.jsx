import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container" style={{ padding: "32px 0" }}>
      <h1>404</h1>
      <p className="muted">Page not found.</p>
      <Link to="/" className="btn btn-primary">Back home</Link>
    </div>
  );
}