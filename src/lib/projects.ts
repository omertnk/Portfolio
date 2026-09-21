import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const COVER_EXTENSIONS = ["png", "jpg", "jpeg", "webp"];

/** public/projects/<slug>/cover.{png,jpg,jpeg,webp} — hangisi varsa onu döndürür. */
function findCover(slug: string): string {
  for (const ext of COVER_EXTENSIONS) {
    const rel = `/projects/${slug}/cover.${ext}`;
    if (fs.existsSync(path.join(PUBLIC_DIR, rel))) return rel;
  }
  return `/projects/${slug}/cover.png`; // bulunamazsa: kırık görsel yerine belirgin bir yol
}

export type ProjectLinks = {
  github?: string;
  demo?: string;
  video?: string;
  store?: string;
  steam?: string;
};

/** Kartta ve detay sayfasında rozet olarak görünür. */
export const PROJECT_STATUSES = {
  released: { label: "Released", tone: "green" },
  active: { label: "In development", tone: "blue" },
  shelved: { label: "Shelved", tone: "gray" },
  prototype: { label: "Prototype", tone: "amber" },
} as const;

export type ProjectStatus = keyof typeof PROJECT_STATUSES;

export type ProjectMeta = {
  slug: string;
  title: string;
  summary: string;
  date: string; // YYYY-MM-DD
  cover: string; // /projects/<slug>/cover.{png,jpg,jpeg,webp}
  tags: string[];
  role?: string;
  duration?: string;
  team?: string;
  status?: ProjectStatus;
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
    cover: data.cover ?? findCover(slug),
    tags: data.tags ?? [],
    role: data.role,
    duration: data.duration,
    team: data.team,
    status: data.status && data.status in PROJECT_STATUSES ? data.status : undefined,
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
