import React from "react";
import "../styles/LoadingState.css";

export default function LoadingState({ label = "Loading..." }) {
  return (
    <div className="loading-container">
      <div className="box-loading">
        <p className="muted">{label}</p>
      </div>
    </div>
  );
}