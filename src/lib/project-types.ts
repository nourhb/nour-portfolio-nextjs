export type PortfolioProject = {
  id: string;
  n: string;
  c: string;
  t: string;
  l: string;
  d: string;
  s: string[];
  u: string;
  tone: string;
  imgs: string[];
  cover: string;
  date: string;
  featured: number;
};

export const CATEGORIES = [
  { id: "web", label: "Web" },
  { id: "wp", label: "WordPress" },
  { id: "ai", label: "AI" },
  { id: "marketing", label: "Marketing" },
  { id: "e-learning", label: "E-Learning" },
  { id: "e-commerce", label: "E-Commerce" },
] as const;
