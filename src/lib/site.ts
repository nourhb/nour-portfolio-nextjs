import type { PortfolioProject } from "@/lib/project-types";
import projectsData from "@/data/projects.json";

export const projects = projectsData as PortfolioProject[];

export const person = {
  name: "Nour El Houda Bouajila",
  jobTitle: "Full-Stack Engineer",
  email: "nourhb58@gmail.com",
  location: "Hamilton, Ontario",
  github: "https://github.com/nourhb",
  linkedin: "https://www.linkedin.com/in/nour-el-houda-bouajila/",
};

export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (production) return `https://${production.replace(/^https?:\/\//, "")}`;
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "")}`;
  return "http://localhost:3000";
}

export function absoluteUrl(path = "/") {
  return new URL(path, getSiteUrl()).toString();
}

export function homeDescription() {
  return `Portfolio of ${projects.length} web, AI, cloud, analytics and WordPress projects by ${person.name}, a full-stack engineer in ${person.location}.`;
}

export function projectSummary(project: PortfolioProject) {
  const lead = (project.l || "").trim();
  const body = (project.d || "").trim();
  const text = lead && body && body !== lead ? `${lead}. ${body}` : lead || body;
  return text.replace(/\s+/g, " ").trim().slice(0, 180);
}

export function findProject(id: string) {
  return projects.find((project) => project.id === id);
}
