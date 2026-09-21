import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export type ProjectLinks = {
  github?: string;
  demo?: string;
  video?: string;
  store?: string;
  steam?: string;
};

export type ProjectMeta = {
  slug: string;
  title: string;
  summary: string;
  date: string; // YYYY-MM-DD
  cover: string; // /projects/<slug>/cover.png
  tags: string[];
  role?: string;
  duration?: string;
  team?: string;
  featured?: boolean;
  draft?: boolean;
  links?: ProjectLinks;
};

export type Project = ProjectMeta & { content: string };

/** YAML'daki tarih Date nesnesi veya string gelebilir; ikisini de YYYY-MM-DD'ye çevir. */
function toISODate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string" && value) return value.slice(0, 10);
  return "1970-01-01";
}

function readProject(file: string): Project {
  const slug = file.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    summary: data.summary ?? "",
    date: toISODate(data.date),
    cover: data.cover ?? `/projects/${slug}/cover.png`,
    tags: data.tags ?? [],
    role: data.role,
    duration: data.duration,
    team: data.team,
    featured: data.featured ?? false,
    draft: data.draft ?? false,
    links: data.links ?? {},
    content,
  };
}

/** Tüm projeler, en yeniden eskiye. Taslaklar (draft: true) production'da gizlenir. */
export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(readProject)
    .filter((p) => !p.draft || process.env.NODE_ENV === "development")
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFeaturedProjects(limit = 3): Project[] {
  const all = getAllProjects();
  const featured = all.filter((p) => p.featured);
  return (featured.length ? featured : all).slice(0, limit);
}

export function getProject(slug: string): Project | null {
  const file = ["mdx", "md"]
    .map((ext) => `${slug}.${ext}`)
    .find((f) => fs.existsSync(path.join(PROJECTS_DIR, f)));
  return file ? readProject(file) : null;
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllProjects().forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return [...tags].sort();
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}
