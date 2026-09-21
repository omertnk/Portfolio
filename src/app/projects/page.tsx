import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
  description: "All the things I have built.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <Container className="py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-2 text-muted">
        {projects.length} project{projects.length === 1 ? "" : "s"}, newest first.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      {projects.length === 0 && (
        <p className="mt-10 text-muted">
          No projects yet. Add a <code>.mdx</code> file under <code>content/projects/</code>.
        </p>
      )}
    </Container>
  );
}
