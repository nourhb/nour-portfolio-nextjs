"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Project } from "@/data/projects";

interface Props {
  project: Project;
  index: number;
  total: number;
  featured?: boolean;
  onOpen: () => void;
}

const toneFor = (category: string) => {
  switch (category) {
    case "WordPress": return "#9b6cff";
    case "AI": return "#b6ff74";
    case "Marketing": return "#41e8ef";
    case "E-Commerce": return "#ff5bd7";
    case "Cloud & DevOps": return "#4f7dff";
    default: return "#41e8ef";
  }
};

export default function ProjectCard({ project, index, total, featured, onOpen }: Props) {
  const ref = useRef<HTMLElement>(null);
  const tone = toneFor(project.category);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 9}deg) translateY(-4px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <article
      ref={ref}
      className="proj-card reveal"
      style={{ ["--card-tone" as string]: tone }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpen();
      }}
      aria-label={`${project.name} — open details`}
    >
      <div className="card-art">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            loading="lazy"
            decoding="async"
            sizes="(max-width: 768px) 92vw, (max-width: 1200px) 45vw, 380px"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="project-art">
            <span className="art-letter" aria-hidden="true">
              {project.name.charAt(0)}
            </span>
          </div>
        )}
        <span className="card-num">
          {String(index + 1).padStart(2, "0")} / {total}
        </span>
        {featured && <span className="feat-badge">Featured</span>}
        {project.gallery && project.gallery.length > 0 && (
          <span
            className="feat-badge"
            style={{ right: featured ? 108 : 12, background: "rgba(7,5,26,0.72)" }}
          >
            {project.gallery.length + (project.image ? 1 : 0)} images
          </span>
        )}
      </div>
      <div className="proj-body">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="proj-cat">{project.category}</span>
        </div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="proj-tags">
          {project.tech.slice(0, 5).map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        <div
          style={{
            marginTop: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 13,
            fontWeight: 800,
          }}
        >
          <span style={{ color: "var(--text)" }}>
            {project.github ? "View on GitHub" : "View details"}
          </span>
          <span className="grad-text" aria-hidden="true">
            ↗
          </span>
        </div>
      </div>
    </article>
  );
}
