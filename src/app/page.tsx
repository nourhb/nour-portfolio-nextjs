import { Portfolio } from "@/components/Portfolio";
import { absoluteUrl, person, projects } from "@/lib/site";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: person.name,
      jobTitle: person.jobTitle,
      email: person.email,
      url: absoluteUrl("/"),
      image: absoluteUrl("/assets/portrait-main.png"),
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hamilton",
        addressRegion: "Ontario",
        addressCountry: "CA",
      },
      sameAs: [person.github, person.linkedin],
      knowsAbout: ["React", "Next.js", "Node.js", "TypeScript", "AWS", "WordPress", "AI agents"],
    },
    {
      "@type": "WebSite",
      name: person.name,
      url: absoluteUrl("/"),
      description: `${person.jobTitle} portfolio in Hamilton, Ontario.`,
    },
    {
      "@type": "ItemList",
      name: "Projects",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/work/${project.id}`),
        name: project.n,
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <Portfolio />
    </>
  );
}
