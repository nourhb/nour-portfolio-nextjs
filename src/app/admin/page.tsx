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
  const [json, setJson] = useState('');

  const generate = () => {
    const techArray = form.tech.split(',').map(t => t.trim()).filter(Boolean);
    const project = {
      id: 999, // Change this to next available ID
      name: form.name,
      category: form.category,
      description: form.description,
      github: form.github,
      tech: techArray,
      image: `/images/project-999.webp`,
      gallery: [`/images/project-999.webp`],
    };
    setJson(JSON.stringify(project, null, 2));
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', color: 'white', background: '#1a1a2e', minHeight: '100vh' }}>
      <h1>Add New Project</h1>
      <p>Fill the form, copy the JSON, and add it to src/data/projects.json</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
        <input
          placeholder="Project Name"
          value={form.name}
          onChange={e => setForm({...form, name: e.target.value})}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #444', background: '#16213e', color: 'white' }}
        />
        <select
          value={form.category}
          onChange={e => setForm({...form, category: e.target.value})}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #444', background: '#16213e', color: 'white' }}
        >
          <option>Web</option>
          <option>WordPress</option>
          <option>AI</option>
          <option>E-Commerce</option>
          <option>Cloud & DevOps</option>
          <option>Marketing</option>
        </select>
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({...form, description: e.target.value})}
          rows={4}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #444', background: '#16213e', color: 'white' }}
        />
        <input
          placeholder="GitHub URL"
          value={form.github}
          onChange={e => setForm({...form, github: e.target.value})}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #444', background: '#16213e', color: 'white' }}
        />
        <input
          placeholder="Tech (comma separated: React, Node.js, AWS)"
          value={form.tech}
          onChange={e => setForm({...form, tech: e.target.value})}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #444', background: '#16213e', color: 'white' }}
        />
        <button
          onClick={generate}
          style={{ padding: '0.75rem', borderRadius: '4px', border: 'none', background: '#e94560', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Generate JSON
        </button>
      </div>

      {json && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Copy this JSON:</h3>
          <pre style={{ background: '#0f0f1e', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
            {json}
          </pre>
          <p style={{ marginTop: '1rem', color: '#aaa' }}>
            1. Copy the JSON above<br/>
            2. Go to GitHub: src/data/projects.json<br/>
            3. Add it to the array (don't forget the comma!)<br/>
            4. Upload your photos to public/images/<br/>
            5. Done! Vercel will deploy automatically.
          </p>
        </div>
      )}
    </div>
  );
}
