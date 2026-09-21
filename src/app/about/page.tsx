import type { Metadata } from "next";
import { site } from "@/config/site";
import { Container } from "@/components/Container";
import { SocialLinks } from "@/components/SocialLinks";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}`,
};

// Buradaki metni kendine göre düzenle.
export default function AboutPage() {
  return (
    <Container className="py-16">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>

      <div className="prose mt-8 max-w-2xl">
        <p>
          I&apos;m {site.name}, a {site.title.toLowerCase()} based in {site.location}. I build games with
          Unreal Engine and web products with modern JavaScript tooling.
        </p>
        <p>
          I enjoy the full arc of a project: prototyping an idea, iterating on feel and feedback, and
          shipping something people can actually use or play.
        </p>

        <h2>Skills</h2>
        <ul>
          <li>Unreal Engine 5 — C++ &amp; Blueprints, gameplay systems, UI</li>
          <li>Web — TypeScript, React, Next.js, Tailwind CSS</li>
          <li>Tools — Git, Perforce, Figma</li>
        </ul>

        <h2>Contact</h2>
        <p>
          The fastest way to reach me is email:{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </div>

      <div className="mt-8">
        <SocialLinks size={22} />
      </div>
    </Container>
  );
}
