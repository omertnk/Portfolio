import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProjectMeta } from "@/lib/projects";
import { formatDate } from "@/lib/projects";
import { Tag } from "./Tag";

export function ProjectCard({ project }: { project: ProjectMeta }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-border">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold leading-tight">{project.title}</h3>
          <ArrowUpRight
            size={16}
            className="mt-0.5 shrink-0 text-muted transition group-hover:text-foreground"
          />
        </div>
        <p className="line-clamp-2 text-sm text-muted">{project.summary}</p>
        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-2">
          {project.tags.slice(0, 4).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
          <span className="ml-auto text-xs text-muted">{formatDate(project.date)}</span>
        </div>
      </div>
    </Link>
  );
}
