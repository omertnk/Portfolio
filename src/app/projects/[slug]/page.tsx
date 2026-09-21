import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ExternalLink, Gamepad2, Play, ShoppingBag } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { getAllProjects, getProject, formatDate } from "@/lib/projects";
import { Container } from "@/components/Container";
import { Tag } from "@/components/Tag";
import { mdxComponents } from "@/components/mdx";

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [{ url: project.cover }],
    },
  };
}

const linkMeta = {
  demo: { label: "Live demo", Icon: ExternalLink },
  github: { label: "Source", Icon: GithubIcon },
  video: { label: "Watch video", Icon: Play },
  store: { label: "Store page", Icon: ShoppingBag },
  steam: { label: "Steam", Icon: Gamepad2 },
} as const;

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const links = Object.entries(project.links ?? {}).filter(([, url]) => url) as [
    keyof typeof linkMeta,
    string,
  ][];

  const facts = [
    { label: "Role", value: project.role },
    { label: "Duration", value: project.duration },
    { label: "Team", value: project.team },
    { label: "Date", value: formatDate(project.date) },
  ].filter((f) => f.value);

  return (
    <article>
      <Container className="pt-10">
        <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground">
          <ArrowLeft size={14} /> All projects
        </Link>

        <header className="mt-6">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted">{project.summary}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </header>

        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl border border-border bg-border">
          <Image src={project.cover} alt={project.title} fill priority sizes="100vw" className="object-cover" />
        </div>
      </Container>

      <Container className="mt-12 grid gap-12 lg:grid-cols-[1fr_220px]">
        <div className="prose max-w-none">
          <MDXRemote
            source={project.content}
            components={mdxComponents}
            // blockJS: içerik yerel ve güvenilir; <Gallery images={[...]} /> gibi prop ifadelerine izin ver
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] }, blockJS: false }}
          />
        </div>

        <aside className="order-first space-y-6 text-sm lg:order-last">
          {facts.length > 0 && (
            <dl className="space-y-3 rounded-xl border border-border bg-card p-4">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-xs uppercase tracking-wide text-muted">{f.label}</dt>
                  <dd className="mt-0.5">{f.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {links.length > 0 && (
            <ul className="space-y-2">
              {links.map(([key, url]) => {
                const { label, Icon } = linkMeta[key];
                return (
                  <li key={key}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 transition hover:border-foreground/40"
                    >
                      <Icon size={15} /> {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </aside>
      </Container>
    </article>
  );
}
