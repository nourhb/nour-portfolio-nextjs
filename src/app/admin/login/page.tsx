'use client';
import { useState } from 'react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        window.location.href = '/admin';
      } else {
        setError(data.error || 'Login failed.');
      }
    } catch {
      setError('Something went wrong. Try again.');
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1a1a2e',
        color: 'white',
        padding: '2rem',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: '380px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          background: '#16213e',
          padding: '2rem',
          borderRadius: '12px',
        }}
      >
        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>🔒 Admin Login</h1>
        <p style={{ color: '#aaa', margin: 0, fontSize: '0.9rem' }}>
          This area is private. Enter the admin password to continue.
        </p>
        <input
          type="password"
          required
          autoFocus
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: '0.75rem',
            borderRadius: '8px',
            border: '1px solid #444',
            background: '#0f0f1e',
            color: 'white',
            width: '100%',
            boxSizing: 'border-box',
          }}
        />
        {error && (
          <p style={{ color: '#f87171', margin: 0, fontSize: '0.9rem' }}>❌ {error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.9rem',
            borderRadius: '8px',
            border: 'none',
            background: loading ? '#666' : '#e94560',
            color: 'white',
            cursor: loading ? 'wait' : 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
          }}
        >
          {loading ? '⏳ Checking...' : 'Unlock'}
        </button>
      </form>
    </div>
  );
}
