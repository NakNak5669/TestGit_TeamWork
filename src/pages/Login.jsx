import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim()) return setError("Email is required.");
    if (!password) return setError("Password is required.");

    // ✅ UI only (later: call API)
    console.log("LOGIN UI:", { email, password });

    navigate("/");
  }

  return (
    <div className="container auth">
      <div className="auth-card">
        <div className="auth-head">
          <h1>Welcome back</h1>
          <p className="muted">Login UI first. Later we connect to Platzi Auth JWT.</p>
        </div>

        {error ? <div className="alert">{error}</div> : null}

        <form className="auth-form" onSubmit={onSubmit}>
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
            <span className="muted">Password</span>
            <div className="input-row">
              <input
                type={show ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setShow((s) => !s)}
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          <div className="auth-row">
            <label className="check">
              <input type="checkbox" />
              <span className="muted">Remember me</span>
            </label>

            <button type="button" className="link-btn" onClick={() => alert("UI only")}>
              Forgot password?
            </button>
          </div>

          <button className="btn btn-primary full" type="submit">
            Login
          </button>
        </form>

        <p className="muted auth-foot">
          New here? <Link to="/register" className="link">Create an account</Link>
        </p>
      </div>
    </div>
  );
}