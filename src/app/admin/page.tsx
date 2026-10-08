'use client';
import { useState } from 'react';

export default function AdminPage() {
  const [form, setForm] = useState({
    name: '',
    category: 'Web',
    description: '',
    github: '',
    tech: '',
  });
  const [cover, setCover] = useState<File | null>(null);
  const [galleries, setGalleries] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('category', form.category);
    formData.append('description', form.description);
    formData.append('github', form.github);
    formData.append('tech', form.tech);
    if (cover) formData.append('cover', cover);
    galleries.forEach((f, i) => formData.append(`gallery_${i}`, f));

    try {
      const res = await fetch('/api/admin/add-project', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setResult(`✅ ${data.message}`);
        setForm({ name: '', category: 'Web', description: '', github: '', tech: '' });
        setCover(null);
        setGalleries([]);
      } else {
        setResult(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      setResult(`❌ Error: ${String(err)}`);
    }
    setLoading(false);
  };

  const inputStyle = { padding: '0.75rem', borderRadius: '8px', border: '1px solid #444', background: '#16213e', color: 'white', width: '100%' };

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto', color: 'white', background: '#1a1a2e', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>➕ Add New Project</h1>
      <p style={{ color: '#aaa', marginBottom: '2rem' }}>Fill the form, upload photos, and click Publish. Everything happens automatically!</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label>Project Name *</label>
          <input required placeholder="My Awesome Project" value={form.name}
            onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} />
        </div>

        <div>
          <label>Category</label>
          <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} style={inputStyle}>
            <option>Web</option>
            <option>WordPress</option>
            <option>AI</option>
            <option>E-Commerce</option>
            <option>Cloud & DevOps</option>
            <option>Marketing</option>
          </select>
        </div>

        <div>
          <label>Description *</label>
          <textarea required placeholder="Describe your project..." value={form.description}
            onChange={e => setForm({...form, description: e.target.value})}
            rows={4} style={inputStyle} />
        </div>

        <div>
          <label>GitHub URL</label>
          <input placeholder="https://github.com/..." value={form.github}
            onChange={e => setForm({...form, github: e.target.value})} style={inputStyle} />
        </div>

        <div>
          <label>Technologies (comma separated)</label>
          <input placeholder="React, Node.js, AWS" value={form.tech}
            onChange={e => setForm({...form, tech: e.target.value})} style={inputStyle} />
        </div>

        <div>
          <label>Cover Image *</label>
          <input type="file" accept="image/*" required
            onChange={e => setCover(e.target.files?.[0] || null)}
            style={{ ...inputStyle, padding: '0.5rem' }} />
          {cover && <p style={{ color: '#4ade80', fontSize: '0.9rem' }}>✓ {cover.name}</p>}
        </div>

        <div>
          <label>Gallery Images (optional, multiple)</label>
          <input type="file" accept="image/*" multiple
            onChange={e => setGalleries(Array.from(e.target.files || []))}
            style={{ ...inputStyle, padding: '0.5rem' }} />
          {galleries.length > 0 && <p style={{ color: '#4ade80', fontSize: '0.9rem' }}>✓ {galleries.length} images selected</p>}
        </div>

        <button type="submit" disabled={loading}
          style={{ padding: '1rem', borderRadius: '8px', border: 'none', background: loading ? '#666' : '#e94560', color: 'white', cursor: loading ? 'wait' : 'pointer', fontWeight: 'bold', fontSize: '1.1rem', marginTop: '1rem' }}>
          {loading ? '⏳ Publishing...' : '🚀 Publish Project'}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: '2rem', padding: '1rem', borderRadius: '8px', background: result.startsWith('✅') ? '#14532d' : '#7f1d1d' }}>
          {result}
        </div>
      )}

      <div style={{ marginTop: '3rem', padding: '1rem', borderRadius: '8px', background: '#0f0f1e', color: '#aaa', fontSize: '0.9rem' }}>
        <strong>How it works:</strong><br/>
        1. Fill the form and upload your photos<br/>
        2. Click "Publish Project"<br/>
        3. Photos upload to GitHub automatically<br/>
        4. Project added to the portfolio<br/>
        5. Vercel deploys automatically (2-3 min)<br/>
        6. Done! 🎉
      </div>
    </div>
  );
}
