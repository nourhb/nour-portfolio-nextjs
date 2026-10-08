import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import Marquee from "@/components/Marquee";
import Dimensions from "@/components/Dimensions";
import ProjectsClient from "./projects/ProjectsClient";
import MeetBuilder from "@/components/MeetBuilder";
import { projects } from "@/data/projects";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <StatsStrip total={projects.length} />
      <Marquee />
      <Dimensions />
      <section className="wrap" aria-label="Project archive" style={{ padding: "40px 0 20px" }}>
        <div className="reveal">
          <span className="kicker">Complete project archive</span>
          <h2 className="section-title">
            All {projects.length} <span className="grad-text">projects.</span>
          </h2>
          <p style={{ color: "var(--muted)", maxWidth: 640, lineHeight: 1.7, marginTop: 12 }}>
            Explore the complete collection. Every project card opens into its full image
            gallery, description and available GitHub source.
          </p>
        </div>
        <div style={{ marginTop: 28 }}>
          <ProjectsClient />
        </div>
      </section>
      <MeetBuilder />
    </main>
  );
}
