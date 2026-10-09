import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { absoluteUrl, findProject, person, projectSummary, projects } from "@/lib/site";
import "../work.css";

type Context = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: Context): Promise<Metadata> {
  const { id } = await params;
  const project = findProject(id);
  if (!project) return { title: "Project" };
  const description = projectSummary(project);
  const images = project.cover ? [{ url: project.cover, alt: project.n }] : undefined;
  return {
    title: project.n,
    description,
    alternates: { canonical: `/work/${project.id}` },
    openGraph: {
      title: project.n,
      description,
      type: "article",
      url: `/work/${project.id}`,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: project.n,
      description,
      images: project.cover ? [project.cover] : undefined,
    },
  };
}

function WorkFallback() {
  return (
    <main className="work-page">
      <nav className="work-bar" aria-label="Project">
        <a href="/#/projects">← Project archive</a>
        <a href="/">Nour El Houda Bouajila</a>
      </nav>
      <article className="wrap work-shell" aria-busy="true">
        <div className="kicker work-kicker">Project</div>
        <h1>Loading project</h1>
      </article>
    </main>
  );
}

export default function ProjectPage({ params }: Context) {
  return (
    <Suspense fallback={<WorkFallback />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

async function ProjectContent({ params }: Context) {
  const { id } = await params;
  const index = projects.findIndex((project) => project.id === id);
  const project = projects[index];
  if (!project) notFound();

  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const gallery = project.imgs.filter((src) => src !== project.cover);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.n,
    headline: project.l || project.n,
    description: project.d,
    datePublished: project.date,
    image: project.cover ? absoluteUrl(project.cover) : undefined,
    url: absoluteUrl(`/work/${project.id}`),
    author: { "@type": "Person", name: person.name, url: absoluteUrl("/") },
    keywords: project.s.join(", "),
  };

  return (
    <main className="work-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <nav className="work-bar" aria-label="Project">
        <a href="/#/projects">← Project archive</a>
        <a href="/">Nour El Houda Bouajila</a>
      </nav>
      <article className="wrap work-shell">
        <div className="kicker work-kicker">{project.t}{project.featured ? " · Featured" : ""}</div>
        <h1>{project.n}</h1>
        {project.l ? <p className="work-lede">{project.l}</p> : null}
        <div className="work-meta">
          <div><b>Published</b><time dateTime={project.date}>{new Date(`${project.date}T00:00:00`).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}</time></div>
          <div><b>Focus</b>{project.t}</div>
          <div><b>Place in archive</b>{String(index + 1).padStart(2, "0")} of {projects.length}</div>
        </div>
        {project.cover ? (
          <figure className="work-cover">
            <img src={project.cover} alt={`${project.n} cover`} />
          </figure>
        ) : null}
        <p className="work-copy">{project.d}</p>
        <div className="archive-tags">
          {project.s.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
        </div>
        <div className="work-actions">
          {project.u ? (
            <a className="button primary" href={project.u} target="_blank" rel="noopener">View on GitHub</a>
          ) : null}
          <a className="button ghost" href="/#/projects">Back to archive</a>
        </div>
        {gallery.length ? (
          <section>
            <h2 className="subhead">Gallery</h2>
            <div className="work-gallery">
              {gallery.map((src, imageIndex) => (
                <img key={src} src={src} alt={`${project.n} interface, view ${imageIndex + 2}`} />
              ))}
            </div>
          </section>
        ) : null}
        <nav className="work-neighbors" aria-label="More projects">
          <a href={`/work/${previous.id}`}>← {previous.n}</a>
          <a href={`/work/${next.id}`}>{next.n} →</a>
        </nav>
      </article>
    </main>
  );
}
