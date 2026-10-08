"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Project } from "@/data/projects";

interface Props {
  project: Project;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ProjectModal({ project, index, total, onClose, onPrev, onNext }: Props) {
  // All images: cover first, then gallery
  const images = useMemo(() => {
    const list: string[] = [];
    if (project.image) list.push(project.image);
    if (project.gallery) list.push(...project.gallery);
    return list;
  }, [project]);

  const [imgIndex, setImgIndex] = useState(0);
  const [prevId, setPrevId] = useState(project.id);

  // Reset gallery position when switching projects (React "adjust state during render" pattern)
  if (prevId !== project.id) {
    setPrevId(project.id);
    setImgIndex(0);
  }

  const stepImg = useCallback(
    (dir: 1 | -1) => {
      if (images.length <= 1) return;
      setImgIndex((i) => (i + dir + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        if (e.shiftKey) onPrev();
        else stepImg(-1);
      }
      if (e.key === "ArrowRight") {
        if (e.shiftKey) onNext();
        else stepImg(1);
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext, stepImg]);

  const hasImages = images.length > 0;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={project.name}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div style={{ position: "relative", height: 320 }}>
          {hasImages ? (
            <Image
              key={images[imgIndex]}
              src={images[imgIndex]}
              alt={`${project.name} — image ${imgIndex + 1}`}
              fill
              sizes="680px"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #0a071f, #18104a)",
              }}
            >
              <span
                className="grad-text"
                style={{ fontFamily: "var(--font-display)", fontSize: 120, fontWeight: 800 }}
              >
                {project.name.charAt(0)}
              </span>
            </div>
          )}
          {/* project prev/next */}
          <button
            onClick={onPrev}
            className="modal-arrow"
            style={{ left: 12 }}
            aria-label="Previous project"
          >
            ‹
          </button>
          <button
            onClick={onNext}
            className="modal-arrow"
            style={{ right: 12 }}
            aria-label="Next project"
          >
            ›
          </button>
          {/* image counter */}
          {images.length > 1 && (
            <span
              style={{
                position: "absolute",
                bottom: 12,
                right: 14,
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.08em",
                background: "rgba(7,5,26,0.72)",
                border: "1px solid var(--line)",
                borderRadius: 999,
                padding: "5px 12px",
                backdropFilter: "blur(8px)",
              }}
            >
              {imgIndex + 1} / {images.length}
            </span>
          )}
        </div>

        {/* gallery thumbnails */}
        {images.length > 1 && (
          <div
            style={{
              display: "flex",
              gap: 8,
              padding: "12px 16px 0",
              overflowX: "auto",
            }}
            aria-label="Project image gallery"
          >
            {images.map((src, i) => (
              <button
                key={src}
                onClick={() => setImgIndex(i)}
                aria-label={`View image ${i + 1}`}
                style={{
                  position: "relative",
                  flex: "0 0 auto",
                  width: 72,
                  height: 48,
                  borderRadius: 8,
                  overflow: "hidden",
                  border: i === imgIndex ? "2px solid var(--cyan)" : "1px solid var(--line)",
                  opacity: i === imgIndex ? 1 : 0.6,
                  cursor: "pointer",
                  padding: 0,
                  background: "none",
                }}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="72px"
                  style={{ objectFit: "cover" }}
                />
              </button>
            ))}
          </div>
        )}

        <div style={{ padding: "28px 36px 36px" }}>
          <h2 style={{ fontSize: 40, marginBottom: 16 }}>{project.name}</h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.75, marginBottom: 24 }}>
            {project.description}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 24,
              padding: 18,
              borderRadius: 14,
              border: "1px solid var(--line)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--faint)", marginBottom: 6 }}>
                PROJECT
              </div>
              <div style={{ fontWeight: 800 }}>
                {String(index + 1).padStart(2, "0")} of {total}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--faint)", marginBottom: 6 }}>
                FOCUS
              </div>
              <div style={{ fontWeight: 800 }}>{project.category}</div>
            </div>
          </div>
          <div className="proj-tags" style={{ marginBottom: 28 }}>
            {project.tech.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="button primary"
              >
                View on GitHub <span aria-hidden="true">↗</span>
              </a>
            )}
            <button onClick={onClose} className="button ghost">
              Back to archive
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
