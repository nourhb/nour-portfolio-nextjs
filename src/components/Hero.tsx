import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero-copy">
        <span className="kicker">
          <span className="status-dot" aria-hidden="true" />
          Full-stack · Cloud · AI
        </span>
        <h1>
          <span className="line">
            <span>I build digital</span>
          </span>
          <span className="line">
            <span>systems that</span>
          </span>
          <span className="line">
            <span className="grad-text">feel alive.</span>
          </span>
        </h1>
        <p className="hero-lede">
          I&apos;m <strong style={{ color: "var(--text)" }}>Nour El Houda Bouajila</strong> — a
          full-stack engineer turning ambitious ideas into polished React experiences, resilient
          Node.js systems, cloud infrastructure and high-performing WordPress products.
        </p>
        <div className="hero-actions">
          <Link href="/projects" className="button primary">
            Enter the project universe <span aria-hidden="true">→</span>
          </Link>
          <a href="/cv.pdf" className="button ghost" download="Nour-El-Houda-Bouajila-CV.pdf">
            Download CV <span aria-hidden="true">↓</span>
          </a>
          <Link href="/contact" className="button ghost">
            Start a conversation
          </Link>
        </div>
        <div className="hero-readout">
          <div className="stat">
            <b>3+ years</b>
            <span>Full-stack experience</span>
          </div>
          <div className="stat">
            <b>React · Node · AWS</b>
            <span>Core engineering stack</span>
          </div>
          <div className="stat">
            <b>Hamilton, Ontario</b>
            <span>Open to opportunities</span>
          </div>
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <div className="portrait-shell">
          <div className="portrait-inner">
            <Image
              src="/images/hero-portrait.webp"
              alt="Nour El Houda Bouajila"
              fill
              priority
              sizes="(max-width: 960px) 88vw, 500px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="orbit-line" aria-hidden="true" />
        </div>
        <span className="float-chip" style={{ top: "6%", right: "-2%", color: "var(--cyan)", animationDelay: "-1s" }}>
          REACT / NEXT.JS
        </span>
        <span className="float-chip" style={{ top: "38%", right: "-6%", color: "var(--pink)", animationDelay: "-2.6s" }}>
          AI AGENTS
        </span>
        <span className="float-chip" style={{ bottom: "14%", left: "-6%", color: "var(--violet)", animationDelay: "-3.8s" }}>
          AWS / DOCKER
        </span>
        <div
          className="float-chip"
          style={{
            bottom: "-4%",
            right: "2%",
            display: "flex",
            flexDirection: "column",
            gap: 6,
            alignItems: "flex-start",
            borderRadius: 16,
            animationDelay: "-4.6s",
          }}
        >
          <span style={{ fontSize: 9, color: "var(--faint)", letterSpacing: "0.14em" }}>
            SYSTEM STATUS
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text)" }}>
            <span className="status-dot" aria-hidden="true" /> Available to build
          </span>
        </div>
      </div>
    </section>
  );
}
