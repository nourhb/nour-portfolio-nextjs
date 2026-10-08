export default function StatsStrip({ total }: { total: number }) {
  const stats = [
    { num: String(total), label: "Projects in the portfolio" },
    { num: "3+", label: "Years building products" },
    { num: "4", label: "Engineering disciplines" },
    { num: "3", label: "Working languages" },
  ];
  return (
    <section className="impact-strip reveal" aria-label="Portfolio statistics">
      <div
        className="wrap"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          padding: "44px 0",
        }}
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            style={{
              padding: "0 28px",
              borderLeft: i === 0 ? "none" : "1px solid var(--line)",
            }}
          >
            <div
              className="grad-text"
              style={{ fontFamily: "var(--font-display)", fontSize: 52, fontWeight: 800 }}
            >
              {s.num}
            </div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--faint)",
                marginTop: 8,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
