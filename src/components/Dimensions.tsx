const dims = [
  {
    num: "01 / Frontend",
    color: "var(--violet)",
    title: "Interfaces with intention",
    text: "Responsive React and Next.js experiences with strong visual hierarchy, thoughtful motion and clean component systems.",
  },
  {
    num: "02 / Backend",
    color: "var(--cyan)",
    title: "Systems that hold up",
    text: "Node.js APIs, MongoDB and MySQL data layers, authentication and product logic designed for clarity.",
  },
  {
    num: "03 / Cloud",
    color: "var(--pink)",
    title: "Delivery without drama",
    text: "AWS, Docker, Kubernetes, CI/CD and infrastructure workflows built for repeatable, observable releases.",
  },
  {
    num: "04 / CMS",
    color: "var(--blue)",
    title: "Commerce that converts",
    text: "Custom WordPress and WooCommerce builds shaped around performance, SEO and day-to-day usability.",
  },
];

export default function Dimensions() {
  return (
    <section className="wrap" style={{ padding: "110px 0 30px" }} aria-label="What I bring">
      <div className="reveal">
        <span className="kicker">What I bring</span>
        <h2 className="section-title" style={{ margin: "18px 0 12px" }}>
          One builder.
          <br />
          Four dimensions.
        </h2>
      </div>
      <p className="reveal" style={{ color: "var(--muted)", maxWidth: 520, lineHeight: 1.75, margin: "0 0 44px" }}>
        Product-minded engineering across the interface, the system behind it and the
        infrastructure that keeps it moving.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 18,
        }}
      >
        {dims.map((d, i) => (
          <div
            key={d.num}
            className="reveal dim-card"
            style={{ ["--reveal-delay" as string]: `${i * 90}ms`, ["--card-tone" as string]: d.color }}
          >
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", color: d.color }}>
              {d.num.toUpperCase()}
            </div>
            <h3 style={{ fontSize: 26, margin: "64px 0 14px" }}>{d.title}</h3>
            <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{d.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
