import Link from "next/link";

export default function MeetBuilder() {
  return (
    <section className="wrap reveal" style={{ padding: "110px 0 20px" }} aria-label="Meet the builder">
      <span className="kicker">Need the person behind the code?</span>
      <Link href="/about" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
        <h2 className="section-title" style={{ marginTop: 18 }}>
          Meet the <span className="grad-text">builder.</span>
          <span className="grad-text" style={{ marginLeft: 24 }} aria-hidden="true">
            ↗
          </span>
        </h2>
      </Link>
      <div className="divider-glow" style={{ marginTop: 44 }} />
    </section>
  );
}
