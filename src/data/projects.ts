import raw from "./projects.json";

export interface Project {
  id: number;
  name: string;
  category: string;
  description: string;
  github: string;
  tech: string[];
  image?: string;
  gallery?: string[];
}

export const projects: Project[] = raw as Project[];

export const categories = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
];

export const categoryColors: Record<string, string> = {
  WordPress: "from-violet-500 to-fuchsia-500",
  "Cloud & DevOps": "from-sky-500 to-cyan-400",
  AI: "from-emerald-500 to-teal-400",
  Web: "from-indigo-500 to-blue-400",
  "E-Commerce": "from-pink-500 to-rose-400",
  Marketing: "from-amber-500 to-orange-400",
};
