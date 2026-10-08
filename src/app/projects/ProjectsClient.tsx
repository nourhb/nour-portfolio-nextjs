"use client";

import { useMemo, useState } from "react";
import { projects, categories, type Project } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";

export default function ProjectsClient() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = filter === "All" || p.category === filter;
      const q = query.trim().toLowerCase();
      const matchQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchQ;
    });
  }, [filter, query]);

  const openIndex = openId === null ? -1 : filtered.findIndex((p) => p.id === openId);

  const step = (dir: 1 | -1) => {
    if (openIndex < 0) return;
    const next = (openIndex + dir + filtered.length) % filtered.length;
    setOpenId(filtered[next].id);
  };

  return (
    <>
      {/* filters */}
      <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 18, marginBottom: 14 }}>
        <div className="filters" role="tablist" aria-label="Filter projects">
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={filter === c}
              className={`filter-btn ${filter === c ? "active" : ""}`}
              onClick={() => setFilter(c)}
            >
              {c === "All" ? `All ${projects.length}` : c}
            </button>
          ))}
        </div>
        <input
          type="search"
          className="search-input"
          placeholder="Search projects or category"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search projects"
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "26px 0 30px" }}>
        <span style={{ fontSize: 13, color: "var(--faint)" }}>Complete archive</span>
        <span style={{ fontSize: 14, fontWeight: 800 }}>
          {filtered.length} / {projects.length} projects
        </span>
      </div>

      {/* complete archive grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 22,
        }}
      >
        {filtered.map((p: Project, i: number) => (
          <ProjectCard
            key={p.id}
            project={p}
            index={i}
            total={projects.length}
            onOpen={() => setOpenId(p.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ color: "var(--faint)", textAlign: "center", padding: "60px 0" }}>
          No projects match your search.
        </p>
      )}

      {openId !== null && openIndex >= 0 && (
        <ProjectModal
          project={filtered[openIndex]}
          index={openIndex}
          total={projects.length}
          onClose={() => setOpenId(null)}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
        />
      )}
    </>
  );
}
