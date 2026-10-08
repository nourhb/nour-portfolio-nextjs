const items = [
  "AWS",
  "Docker",
  "WordPress",
  "AI agents",
  "React",
  "TypeScript",
  "Node.js",
  "Kubernetes",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((half) => (
          <span key={half}>
            {row.map((item, i) => (
              <span key={`${half}-${i}`}>
                {item} <i>✦</i>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
