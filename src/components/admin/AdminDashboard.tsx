"use client";

import { useEffect, useMemo, useState } from "react";
import { CATEGORIES, type PortfolioProject } from "@/lib/project-types";

type EditorState = {
  id: string;
  name: string;
  category: string;
  type: string;
  lede: string;
  description: string;
  tags: string;
  github: string;
  tone: string;
  date: string;
  featured: string;
  coverPath: string;
  keepImages: string[];
  coverFile: File | null;
  galleryFiles: File[];
};

const emptyEditor = (): EditorState => ({
  id: "",
  name: "",
  category: "web",
  type: "Web",
  lede: "",
  description: "",
  tags: "",
  github: "",
  tone: "#9b6cff",
  date: new Date().toISOString().slice(0, 10),
  featured: "0",
  coverPath: "",
  keepImages: [],
  coverFile: null,
  galleryFiles: [],
});

function fromProject(project: PortfolioProject): EditorState {
  return {
    id: project.id,
    name: project.n,
    category: project.c,
    type: project.t,
    lede: project.l,
    description: project.d,
    tags: project.s.join(", "),
    github: project.u,
    tone: project.tone,
    date: project.date,
    featured: String(project.featured || 0),
    coverPath: project.cover,
    keepImages: project.imgs,
    coverFile: null,
    galleryFiles: [],
  };
}

export function AdminDashboard() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [storage, setStorage] = useState<"local" | "github">("local");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [editor, setEditor] = useState<EditorState | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  async function load() {
    const response = await fetch("/api/admin/projects");
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not load projects.");
    setProjects(data.projects);
    setStorage(data.storage);
  }

  useEffect(() => {
    load().catch((reason: Error) => setError(reason.message));
  }, []);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory = category === "all" || project.c === category;
      const haystack = `${project.n} ${project.t} ${project.s.join(" ")}`.toLowerCase();
      return matchesCategory && (!needle || haystack.includes(needle));
    });
  }, [projects, query, category]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!editor) return;
    setSaving(true);
    setError("");
    setMessage("");
    const form = new FormData();
    form.set("id", editor.id);
    form.set("name", editor.name);
    form.set("category", editor.category);
    form.set("type", editor.type);
    form.set("lede", editor.lede);
    form.set("description", editor.description);
    form.set("tags", editor.tags);
    form.set("github", editor.github);
    form.set("tone", editor.tone);
    form.set("date", editor.date);
    form.set("featured", editor.featured);
    form.set("coverPath", editor.coverPath);
    form.set("keepImages", JSON.stringify(editor.keepImages));
    if (editor.coverFile) form.set("cover", editor.coverFile);
    editor.galleryFiles.forEach((file) => form.append("gallery", file));

    try {
      const response = await fetch("/api/admin/projects", { method: "POST", body: form });
      const data = await response.json();
      if (!data.success) throw new Error(data.error || "Save failed.");
      setMessage(data.message);
      setEditor(null);
      await load();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(project: PortfolioProject) {
    if (pendingDelete !== project.id) {
      setPendingDelete(project.id);
      setMessage("");
      return;
    }
    setError("");
    const response = await fetch(`/api/admin/projects/${project.id}`, { method: "DELETE" });
    const data = await response.json();
    if (!data.success) {
      setError(data.error || "Could not delete that project.");
      return;
    }
    setMessage("Project deleted.");
    setPendingDelete(null);
    if (editor?.id === project.id) setEditor(null);
    await load();
  }

  return (
    <main className="admin-wrap">
      <header className="admin-top">
        <div>
          <div className="admin-kicker">Project archive</div>
          <h1>Admin</h1>
        </div>
        <div className="admin-actions">
          <a className="admin-ghost" href="/">View site</a>
          <button className="admin-ghost" type="button" onClick={logout}>Log out</button>
          <button className="admin-btn" type="button" onClick={() => { setEditor(emptyEditor()); setMessage(""); }}>
            New project
          </button>
        </div>
      </header>
      <p className="admin-note">
        {projects.length} projects.
        {storage === "github"
          ? " Saves publish to GitHub and redeploy the site."
          : " Saves stay on this computer until GITHUB_TOKEN is set."}
      </p>
      {message ? <p className="admin-ok">{message}</p> : null}
      {error ? <p className="admin-error">{error}</p> : null}

      {editor ? (
        <form className="editor" onSubmit={save}>
          <h2>{editor.id ? "Edit project" : "New project"}</h2>
          <div className="editor-grid">
            <div>
              <label className="admin-field">Name
                <input value={editor.name} onChange={(event) => setEditor((current) => current && { ...current, name: event.target.value })} required />
              </label>
              <label className="admin-field">Short line
                <input value={editor.lede} onChange={(event) => setEditor((current) => current && { ...current, lede: event.target.value })} />
              </label>
              <label className="admin-field">Description
                <textarea value={editor.description} onChange={(event) => setEditor((current) => current && { ...current, description: event.target.value })} required />
              </label>
              <label className="admin-field">Tags, separated by commas
                <input value={editor.tags} onChange={(event) => setEditor((current) => current && { ...current, tags: event.target.value })} />
              </label>
            </div>
            <div>
              <label className="admin-field">Category
                <select value={editor.category} onChange={(event) => setEditor((current) => current && { ...current, category: event.target.value })}>
                  {CATEGORIES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
                </select>
              </label>
              <label className="admin-field">Type label
                <input value={editor.type} onChange={(event) => setEditor((current) => current && { ...current, type: event.target.value })} />
              </label>
              <label className="admin-field">GitHub URL
                <input value={editor.github} onChange={(event) => setEditor((current) => current && { ...current, github: event.target.value })} placeholder="https://github.com/..." />
              </label>
              <div className="admin-row">
                <label className="admin-field">Date
                  <input type="date" value={editor.date} onChange={(event) => setEditor((current) => current && { ...current, date: event.target.value })} required />
                </label>
                <label className="admin-field">Featured order
                  <input type="number" min="0" max="99" value={editor.featured} onChange={(event) => setEditor((current) => current && { ...current, featured: event.target.value })} />
                </label>
              </div>
              <label className="admin-field">Tone
                <input type="color" value={editor.tone} onChange={(event) => setEditor((current) => current && { ...current, tone: event.target.value })} />
              </label>
              <label className="admin-field">Replace cover
                <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={(event) => setEditor((current) => current && { ...current, coverFile: event.target.files?.[0] || null })} />
              </label>
              {editor.coverPath ? <img className="thumb" src={editor.coverPath} alt="" /> : null}
              <label className="admin-field">Add gallery images
                <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" multiple onChange={(event) => setEditor((current) => current && { ...current, galleryFiles: Array.from(event.target.files || []) })} />
              </label>
              <div className="gallery-edit">
                {editor.keepImages.map((src) => (
                  <button
                    type="button"
                    key={src}
                    onClick={() => setEditor((current) => current && { ...current, keepImages: current.keepImages.filter((item) => item !== src) })}
                    aria-label="Remove gallery image"
                  >
                    <img src={src} alt="" />
                    <span>×</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="admin-actions">
            <button className="admin-btn" type="submit" disabled={saving}>{saving ? "Saving…" : "Save project"}</button>
            <button className="admin-ghost" type="button" onClick={() => setEditor(null)}>Cancel</button>
          </div>
        </form>
      ) : null}

      <div className="admin-toolbar">
        <input className="admin-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects" aria-label="Search projects" />
        <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter by category">
          <option value="all">All categories</option>
          {CATEGORIES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
        </select>
      </div>
      <div className="admin-list">
        {visible.map((project) => (
          <article className="admin-card project-row" key={project.id}>
            {project.cover ? <img src={project.cover} alt="" /> : <div className="thumb" />}
            <div>
              <div className="pill">{project.t}{project.featured ? " · Featured" : ""}</div>
              <h3>{project.n}</h3>
              <p>{project.l || project.d}</p>
            </div>
            <div className="admin-actions">
              <button className="admin-ghost" type="button" onClick={() => { setEditor(fromProject(project)); setMessage(""); setPendingDelete(null); }}>Edit</button>
              <button className="admin-danger" type="button" onClick={() => remove(project)}>
                {pendingDelete === project.id ? "Confirm delete" : "Delete"}
              </button>
              {pendingDelete === project.id ? (
                <button className="admin-ghost" type="button" onClick={() => setPendingDelete(null)}>Cancel</button>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
