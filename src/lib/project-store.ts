import { promises as fs } from "fs";
import path from "path";
import { CATEGORIES, type PortfolioProject } from "@/lib/project-types";

export type { PortfolioProject };

const DATA_PATH = path.join(process.cwd(), "src", "data", "projects.json");
const REPO_PATH = "src/data/projects.json";

function repo() {
  return {
    owner: process.env.GITHUB_OWNER || "nourhb",
    name: process.env.GITHUB_REPO || "nour-portfolio-nextjs",
    branch: process.env.GITHUB_BRANCH || "main",
    token: process.env.GITHUB_TOKEN || "",
  };
}

export function storageMode(): "github" | "local" {
  return repo().token ? "github" : "local";
}

async function github(apiPath: string, method = "GET", body?: unknown) {
  const { token } = repo();
  const response = await fetch(`https://api.github.com${apiPath}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || `GitHub request failed (${response.status})`);
  }
  return data as { content?: string; sha?: string; message?: string };
}

export async function readProjects(): Promise<PortfolioProject[]> {
  if (storageMode() === "github") {
    const { owner, name, branch } = repo();
    const data = await github(
      `/repos/${owner}/${name}/contents/${REPO_PATH}?ref=${encodeURIComponent(branch)}`
    );
    const json = Buffer.from(data.content || "", "base64").toString("utf8");
    return JSON.parse(json) as PortfolioProject[];
  }
  const json = await fs.readFile(DATA_PATH, "utf8");
  return JSON.parse(json) as PortfolioProject[];
}

export async function writeProjects(projects: PortfolioProject[]) {
  const content = JSON.stringify(projects, null, 2) + "\n";
  if (storageMode() === "github") {
    const { owner, name, branch } = repo();
    const current = await github(
      `/repos/${owner}/${name}/contents/${REPO_PATH}?ref=${encodeURIComponent(branch)}`
    );
    await github(`/repos/${owner}/${name}/contents/${REPO_PATH}`, "PUT", {
      message: "Update portfolio projects",
      content: Buffer.from(content).toString("base64"),
      sha: current.sha,
      branch,
    });
    return;
  }
  await fs.writeFile(DATA_PATH, content);
}

export async function saveUploadedImage(file: File, id: string, label: string) {
  const ext =
    file.type === "image/png"
      ? "png"
      : file.type === "image/jpeg"
        ? "jpg"
        : file.type === "image/webp"
          ? "webp"
          : file.type === "image/gif"
            ? "gif"
            : "";
  if (!ext) throw new Error("Use a PNG, JPG, WEBP, or GIF image.");
  if (file.size > 4 * 1024 * 1024) throw new Error("Each image must be 4MB or smaller.");

  const filename = `${id}-${label}-${Date.now().toString(36)}.${ext}`;
  const publicPath = `/assets/projects/uploads/${filename}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  if (storageMode() === "github") {
    const { owner, name, branch } = repo();
    await github(`/repos/${owner}/${name}/contents/public/assets/projects/uploads/${filename}`, "PUT", {
      message: `Add project image ${filename}`,
      content: bytes.toString("base64"),
      branch,
    });
  } else {
    const full = path.join(process.cwd(), "public", "assets", "projects", "uploads", filename);
    await fs.mkdir(path.dirname(full), { recursive: true });
    await fs.writeFile(full, bytes);
  }
  return publicPath;
}

export function normalizeProject(input: Partial<PortfolioProject>, id: string): PortfolioProject {
  const category = CATEGORIES.some((item) => item.id === input.c) ? String(input.c) : "web";
  const name = String(input.n || "").trim();
  const description = String(input.d || "").trim();
  if (!name || !description) throw new Error("Name and description are required.");
  if (name.length > 140) throw new Error("Name is too long.");

  const github = String(input.u || "").trim();
  if (github && !/^https:\/\/(www\.)?github\.com\/[\w./-]+$/i.test(github)) {
    throw new Error("GitHub link must be an https://github.com URL.");
  }

  const tone = String(input.tone || "#9b6cff");
  if (!/^#[0-9a-fA-F]{6}$/.test(tone)) throw new Error("Tone must be a hex color like #9b6cff.");

  const date = String(input.date || new Date().toISOString().slice(0, 10));
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("Date must be YYYY-MM-DD.");

  const tags = (Array.isArray(input.s) ? input.s : [])
    .map((tag) => String(tag).trim())
    .filter(Boolean)
    .slice(0, 12);
  const imgs = (Array.isArray(input.imgs) ? input.imgs : [])
    .map((item) => String(item))
    .filter((item) => item.startsWith("/assets/"))
    .slice(0, 24);

  return {
    id,
    n: name,
    c: category,
    t: String(input.t || "Web").trim().slice(0, 40) || "Web",
    l: String(input.l || "").trim().slice(0, 180),
    d: description.slice(0, 2000),
    s: tags,
    u: github,
    tone,
    imgs,
    cover: String(input.cover || imgs[0] || ""),
    date,
    featured: Math.max(0, Math.min(99, Number(input.featured) || 0)),
  };
}
