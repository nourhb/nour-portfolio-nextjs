import type { Metadata } from "next";
import Image from "next/image";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "About | Nour El Houda Bouajila",
  description: "About Nour El Houda Bouajila — full-stack engineer in Hamilton, Ontario. Experience, education and languages.",
};

const techTags = [
  "React", "Next.js", "Node.js", "TypeScript", "MongoDB",
  "AWS", "Docker", "Kubernetes", "WordPress", "WooCommerce", "Power BI",
];

const experience = [
  {
    period: "2025 – Present",
    role: "Full Stack Developer · Digital Men",
    location: "Tunisia / Remote",
    text: "Building and maintaining modern full-stack applications across product and cloud delivery.",
  },
  {
    period: "2024 – 2025",
    role: "Full Stack Developer · GrowthLab",
    location: "Tunisia",
    text: "MERN applications, CMS integration and performance-focused web delivery.",
  },
  {
    period: "2023 – Present",
    role: "Freelance Web Developer",
    location: "International",
    text: "Custom full-stack and CMS work delivered through digital platforms.",
  },
  {
    period: "2022 – 2023",
    role: "IT Assistant · Windeco",
    location: "Mahdia, Tunisia",
    text: "Internal web systems and day-to-day technology support.",
  },
  {
    period: "2022",
    role: "Web Developer Intern · FCAP",
    location: "Sousse, Tunisia",
    text: "Application work supporting HR and accounting workflows.",
  },
];

const education = [
  {
    period: "2023 – 2026",
    title: "Engineer's Degree in Cloud Computing & Virtualization",
    school: "iTeam University",
  },
  {
    period: "2020 – 2022",
    title: "Bachelor's in Business Intelligence & Data Analytics",
    school: "Institut Supérieur de Gestion de Sousse · mention bien",
  },
];

const languages = [
  { lang: "Arabic", level: "Native" },
  { lang: "French", level: "Advanced" },
  { lang: "English", level: "Professional" },
];

export default function AboutPage() {
  return (
    <main className="wrap" style={{ paddingTop: 150, paddingBottom: 40 }}>
      {/* header */}
      <section style={{ position: "relative", marginBottom: 90 }}>
        <span className="kicker reveal">About</span>
        <h1 className="section-title reveal" style={{ marginTop: 18, position: "relative", zIndex: 2 }}>
          Curious by nature.
          <br />
          <span className="grad-text">Precise by practice.</span>
        </h1>
        <span className="ghost-num" aria-hidden="true">03</span>
        <p className="reveal" style={{ color: "var(--muted)", maxWidth: 560, lineHeight: 1.75, marginTop: 20 }}>
          A full-stack engineer who cares equally about the architecture beneath a product and the
          experience on its surface.
        </p>
      </section>

      {/* about nour */}
      <section style={{ display: "grid", gridTemplateColumns: "minmax(0,0.9fr) minmax(0,1.1fr)", gap: 56, marginBottom: 110 }} className="about-grid">
        <div className="reveal">
          <div className="big-num" aria-hidden="true">3+</div>
          <p style={{ fontSize: 12, letterSpacing: "0.12em", color: "var(--muted)", textTransform: "uppercase", lineHeight: 1.8 }}>
            Years connecting product,<br />engineering and growth
          </p>
        </div>
        <div className="reveal">
          <span className="kicker">About Nour</span>
          <h2 style={{ fontSize: "clamp(36px, 4.6vw, 60px)", margin: "16px 0 20px" }}>
            Engineering clarity into <span className="grad-text">complex ideas.</span>
          </h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: 24 }}>
            From Hamilton, Ontario, I build across the product stack: expressive interfaces,
            reliable backends, cloud infrastructure and custom CMS experiences. My business
            intelligence and SEO background keeps every build grounded in how people discover,
            understand and use it.
          </p>
          <div className="proj-tags" style={{ marginBottom: 30 }}>
            {techTags.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
          <a href="/cv.pdf" className="button ghost" download="Nour-El-Houda-Bouajila-CV.pdf">
            Read the full story
          </a>
        </div>
      </section>

      {/* modern web products */}
      <section className="reveal" style={{ display: "grid", gridTemplateColumns: "minmax(0,0.9fr) minmax(0,1.1fr)", gap: 56, alignItems: "center", marginBottom: 110 }} aria-label="Profile">
        <div style={{ position: "relative" }}>
          <div className="portrait-shell" style={{ width: "min(100%, 460px)" }}>
            <div className="portrait-inner">
              <Image
                src="/images/hero-portrait.webp"
                alt="Nour El Houda Bouajila"
                fill
                loading="lazy"
                sizes="(max-width: 960px) 88vw, 460px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="orbit-line" aria-hidden="true" />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, fontSize: 11, color: "var(--faint)" }}>
            <span>Hamilton, Ontario</span>
            <span>Full-stack engineer</span>
          </div>
        </div>
        <div>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.15, marginBottom: 22 }}>
            I build modern web products that connect <span className="grad-text">clean interfaces</span>,
            reliable systems and measurable outcomes.
          </h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: 36 }}>
            My work spans React and Next.js frontends, Node.js and MongoDB backends, AWS
            infrastructure, Docker deployments and custom WordPress solutions. A background in
            business intelligence, data analysis, SEO and digital marketing helps me approach
            software as more than code: it is a system for helping people find, understand and act.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "1px solid var(--line)", paddingTop: 26 }}>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 800 }}>3+</div>
              <div style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--faint)", textTransform: "uppercase", marginTop: 6 }}>Years in development</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 800 }}>{projects.length}</div>
              <div style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--faint)", textTransform: "uppercase", marginTop: 6 }}>Portfolio projects</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 800 }}>3</div>
              <div style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--faint)", textTransform: "uppercase", marginTop: 6 }}>Working languages</div>
            </div>
          </div>
          <a href="/cv.pdf" className="button ghost" download="Nour-El-Houda-Bouajila-CV.pdf" style={{ marginTop: 30 }}>
            Download CV <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      {/* experience */}
      <section style={{ marginBottom: 110 }} aria-label="Experience">
        <h2 className="reveal" style={{ fontSize: "clamp(36px, 4.6vw, 60px)", marginBottom: 40 }}>
          Experience
        </h2>
        <div>
          {experience.map((e, i) => (
            <div
              key={e.role}
              className="reveal timeline-row"
              style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
            >
              <span className="timeline-period">{e.period}</span>
              <div className="timeline-main">
                <h3 style={{ fontSize: 22, marginBottom: 8 }}>{e.role}</h3>
                <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{e.text}</p>
              </div>
              <span className="timeline-loc">{e.location}</span>
            </div>
          ))}
        </div>
      </section>

      {/* education */}
      <section style={{ marginBottom: 90 }} aria-label="Education">
        <h2 className="reveal" style={{ fontSize: "clamp(36px, 4.6vw, 60px)", marginBottom: 36 }}>
          Education
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
          {education.map((e, i) => (
            <div key={e.title} className="reveal edu-card" style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", color: "var(--cyan)", marginBottom: 18 }}>
                {e.period}
              </div>
              <h3 style={{ fontSize: 24, marginBottom: 12 }}>{e.title}</h3>
              <p style={{ color: "var(--muted)", fontSize: 14, margin: 0 }}>{e.school}</p>
            </div>
          ))}
        </div>
      </section>

      {/* languages */}
      <section aria-label="Languages">
        <h2 className="reveal" style={{ fontSize: "clamp(36px, 4.6vw, 60px)", marginBottom: 36 }}>
          Languages
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 18 }}>
          {languages.map((l, i) => (
            <div key={l.lang} className="reveal lang-card" style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>{l.lang}</div>
              <div style={{ color: "var(--muted)", fontSize: 14 }}>{l.level}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
