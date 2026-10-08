import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects | Nour El Houda Bouajila",
  description: `Complete archive of ${projects.length} projects by Nour El Houda Bouajila — web, WordPress, AI, marketing and e-commerce.`,
};

export default function ProjectsPage() {
  return (
    <main className="wrap" style={{ paddingTop: 150, paddingBottom: 40 }}>
      <section style={{ position: "relative", marginBottom: 56 }}>
        <span className="kicker reveal">Project universe</span>
        <h1 className="section-title reveal" style={{ marginTop: 18, position: "relative", zIndex: 2 }}>
          Original work,
          <br />
          <span className="grad-text">beautifully presented.</span>
        </h1>
        <span className="ghost-num" aria-hidden="true">
          {projects.length}
        </span>
        <p className="reveal" style={{ color: "var(--muted)", maxWidth: 520, lineHeight: 1.75, marginTop: 20 }}>
          Explore all {projects.length} projects in the portfolio. Every card opens into its full
          image gallery, description and available GitHub source.
        </p>
      </section>

      <section className="reveal" style={{ marginBottom: 40 }}>
        <span className="kicker">Complete project archive</span>
        <h2 className="section-title" style={{ marginTop: 14 }}>
          All <span className="grad-text">{projects.length}</span> projects.
        </h2>
        <p style={{ color: "var(--faint)", fontSize: 14, marginTop: 12 }}>
          Published dates from the original WordPress portfolio. Newest to oldest.
        </p>
      </section>

      <ProjectsClient />
    </main>
  );
}
