"use client";

import { useState } from "react";
import Link from "next/link";
import { projects, type Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

const FEATURED_IDS = [35, 37, 39]; // Noura, Forge, Haven — signature work

export default function FeaturedProjects() {
  const featured: Project[] = FEATURED_IDS.map((id) => projects.find((p) => p.id === id)!).filter(Boolean);
  const [openId, setOpenId] = useState<number | null>(null);

  const openIndex = featured.findIndex((p) => p.id === openId);

  const step = (dir: 1 | -1) => {
    if (openIndex < 0) return;
    const next = (openIndex + dir + featured.length) % featured.length;
    setOpenId(featured[next].id);
  };

  return (
    <section className="wrap" style={{ padding: "90px 0 30px" }} aria-label="Featured projects">
      <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "end", flexWrap: "wrap", gap: 16 }}>
        <div>
          <span className="kicker">Pinned selection</span>
          <h2 className="section-title" style={{ marginTop: 14 }}>
            Featured projects
          </h2>
        </div>
        <p style={{ color: "var(--faint)", fontSize: 14, margin: 0 }}>
          Signature work, chosen to lead the archive.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 22,
          marginTop: 36,
        }}
      >
        {featured.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            index={i}
            total={projects.length}
            featured
            onOpen={() => setOpenId(p.id)}
          />
        ))}
      </div>

      <div className="reveal" style={{ marginTop: 40, textAlign: "center" }}>
        <Link href="/projects" className="button ghost">
          Explore the complete archive <span aria-hidden="true">→</span>
        </Link>
      </div>

      {openId !== null && openIndex >= 0 && (
        <ProjectModal
          project={featured[openIndex]}
          index={openIndex}
          total={projects.length}
          onClose={() => setOpenId(null)}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
        />
      )}
    </section>
  );
}
