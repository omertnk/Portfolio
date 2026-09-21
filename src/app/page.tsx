import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import { getFeaturedProjects } from "@/lib/projects";
import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { SocialLinks } from "@/components/SocialLinks";

export default function HomePage() {
  const featured = getFeaturedProjects(3);

  return (
    <Container>
      {/* Hero */}
      <section className="py-20 sm:py-28">
        <p className="mb-3 text-sm font-medium text-accent">{site.title}</p>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Hi, I&apos;m {site.name}.
        </h1>
        <p className="mt-5 max-w-xl text-lg text-muted">{site.description}</p>
        <div className="mt-8 flex items-center gap-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-90"
          >
            View projects <ArrowRight size={16} />
          </Link>
          <SocialLinks />
        </div>
      </section>

      {/* Featured projects */}
      <section>
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Featured work</h2>
          <Link href="/projects" className="text-sm text-muted transition hover:text-foreground">
            All projects →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </Container>
  );
}
