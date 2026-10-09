import type { MetadataRoute } from "next";
import { absoluteUrl, projects } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = projects.reduce((newest, project) => (project.date > newest ? project.date : newest), "2024-01-01");

  return [
    {
      url: absoluteUrl("/"),
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: absoluteUrl(`/work/${project.id}`),
      lastModified: project.date,
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.8 : 0.6,
      images: project.cover ? [absoluteUrl(project.cover)] : undefined,
    })),
  ];
}
