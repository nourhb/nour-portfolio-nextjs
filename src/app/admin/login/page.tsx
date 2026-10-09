"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (!data.success) {
        setError(data.error || "Login failed.");
        setLoading(false);
        return;
      }
      window.location.href = "/admin";
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  }

  return (
    <main className="login-screen">
      <form className="login-card" onSubmit={onSubmit}>
        <div className="admin-kicker">Private</div>
        <h1>Admin login</h1>
        <p className="admin-muted">
          Manage the project archive. The password comes from the ADMIN_PASSWORD environment variable.
        </p>
        <input
          type="password"
          required
          autoFocus
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          aria-label="Admin password"
        />
        {error ? <p className="admin-error">{error}</p> : null}
        <button className="admin-btn" type="submit" disabled={loading}>
          {loading ? "Checking…" : "Unlock"}
        </button>
      </form>
    </main>
  );
}
