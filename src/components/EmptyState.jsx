import React from "react";
import "../styles/UI.css";

export default function EmptyState({ title, subtitle, action }) {
  return (
    <div className="empty">
      <h3>{title}</h3>
      {subtitle ? <p className="muted">{subtitle}</p> : null}
      {action ? <div className="empty-actions">{action}</div> : null}
    </div>
  );
}