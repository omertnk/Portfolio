import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import { getFeaturedProjects } from "@/lib/projects";
import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { SocialLinks } from "@/components/SocialLinks";
import { Tag } from "@/components/Tag";

// Ana sayfadaki kısa tanıtım. Uzun hali /about sayfasında.
const skills = [
  "Unreal Engine 5",
  "C++",
  "Blueprints",
  "Gameplay Ability System",
  "Multiplayer",
  "Animation",
  "AI",
];

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

      {/* Short about */}
      <section className="mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">About me</h2>
        <div className="mt-5 max-w-2xl space-y-4 text-muted">
          <p>
            I&apos;m a computer engineering graduate who started making games in my first year at
            university, with a nine-person team and no Unreal experience between us. That project
            became ROSE, which shipped on Steam after a $50,000 investment from Digiage.
          </p>
          <p>
            ROSE got me hired onto Ponchiqs, a multiplayer shooter on the Epic Games Store, where I
            built the movement and traversal abilities and learned how Unreal&apos;s replication and
            Gameplay Ability System really work. I&apos;m now building EndOfLife, my own project.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {skills.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>

        <Link
          href="/about"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition hover:opacity-80"
        >
          More about me <ArrowRight size={14} />
        </Link>
      </section>
    </Container>
  );
}
