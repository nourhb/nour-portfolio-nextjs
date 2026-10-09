"use client";

import { useState } from "react";

export function ProjectGallery({ title, images }: { title: string; images: string[] }) {
  const [index, setIndex] = useState(0);
  if (!images.length) return null;

  const current = images[index] ?? images[0];
  const count = images.length;

  function go(step: number) {
    setIndex((value) => (value + step + count) % count);
  }

  return (
    <figure
      className="work-viewer"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") go(-1);
        if (event.key === "ArrowRight") go(1);
      }}
    >
      <div className="work-stage">
        <span className="work-badge">
          Image {index + 1} / {count}
        </span>
        <img src={current} alt={`${title} interface, view ${index + 1}`} />
        {count > 1 ? (
          <>
            <button className="work-arrow prev" type="button" aria-label="Previous image" onClick={() => go(-1)}>
              ‹
            </button>
            <button className="work-arrow next" type="button" aria-label="Next image" onClick={() => go(1)}>
              ›
            </button>
          </>
        ) : null}
      </div>
      {count > 1 ? (
        <div className="work-thumbs" aria-label="Project images">
          {images.map((src, imageIndex) => (
            <button
              key={`${src}-${imageIndex}`}
              type="button"
              className={imageIndex === index ? "active" : undefined}
              aria-label={`Show image ${imageIndex + 1}`}
              aria-current={imageIndex === index ? "true" : undefined}
              onClick={() => setIndex(imageIndex)}
            >
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      ) : null}
    </figure>
  );
}
