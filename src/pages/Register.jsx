import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!name.trim()) return setError("Name is required.");
    if (!email.trim()) return setError("Email is required.");
    if (!password) return setError("Password is required.");
    if (password.length < 6) return setError("Password should be at least 6 characters.");
    if (password !== confirm) return setError("Passwords do not match.");

    // ✅ UI only (later: call API)
    console.log("REGISTER UI:", { name, email, avatar, password });

    navigate("/login");
  }

  return (
    <div className="container auth">
      <div className="auth-card">
        <div className="auth-head">
          <h1>Create account</h1>
          <p className="muted">Register UI first. Later we connect to API register.</p>
        </div>

        {error ? <div className="alert">{error}</div> : null}

        <form className="auth-form" onSubmit={onSubmit}>
          <label className="field">
            <span className="muted">Full name</span>
            <input
              type="text"
              placeholder="Nak Student"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </label>

          <label className="field">
            <span className="muted">Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </label>

          <label className="field">
            <span className="muted">Avatar URL (optional)</span>
            <input
              type="url"
              placeholder="https://..."
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </label>

          <label className="field">
            <span className="muted">Password</span>
            <div className="input-row">
              <input
                type={show ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
              <button type="button" className="btn btn-ghost" onClick={() => setShow((s) => !s)}>
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          <label className="field">
            <span className="muted">Confirm password</span>
            <input
              type={show ? "text" : "password"}
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
            />
          </label>

          <button className="btn btn-primary full" type="submit">
            Create account
          </button>
        </form>

        <p className="muted auth-foot">
          Already have an account? <Link to="/login" className="link">Login</Link>
        </p>
      </div>
    </div>
  );
}