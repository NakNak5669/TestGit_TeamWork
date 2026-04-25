import React from "react";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} NakShop — UI First (React + Vite)</p>
        <p className="muted">Later you can replace mock data with Platzi Fake API.</p>
      </div>
    </footer>
  );
}