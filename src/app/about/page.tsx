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
          I&apos;m Ömer, a computer engineering graduate working as a gameplay programmer in Unreal
          Engine.
        </p>
        <p>
          I started making games in my first year at university, with a nine-person team and no idea
          what I was doing. None of us had used Unreal before. That project became ROSE, and partway
          through it picked up a $50,000 investment from Digiage, which changed how we worked.
          Deadlines started to mean something. I learned what it takes to work on a project people
          have put money into, how a studio is actually run, and what it means to be part of a team
          rather than a group of students sharing a repository.
        </p>
        <p>
          ROSE got me hired onto Ponchiqs, a multiplayer shooter on the Epic Games Store. I worked
          next to a senior developer there and learned more in those months than in the two years
          before. That is where the Gameplay Ability System and Unreal&apos;s multiplayer framework
          stopped being things I had read about and became things I could build with. Ponchiqs also
          showed me how games are made professionally, with everything that comes with it.
        </p>
        <p>
          After Ponchiqs I went back to finish my degree and started EndOfLife, my own project. It is
          where I put everything from the first two projects together and pushed further into
          Unreal&apos;s newer tech. It taught me how to design a system from the ground up instead of
          bolting one onto whatever already exists, and I&apos;m still working on it.
        </p>

        <h2>What I work with</h2>
        <ul>
          <li>Unreal Engine 5 — C++ and Blueprints, gameplay systems, Gameplay Ability System</li>
          <li>Multiplayer — replication, client prediction, server-authoritative design</li>
          <li>Animation — layered animation systems, state machines</li>
          <li>AI — Behavior Trees, EQS</li>
          <li>Tools — Git, Plastic SCM, Perforce, Jira</li>
        </ul>

        <h2>Contact</h2>
        <p>
          The fastest way to reach me is email: <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </div>

      <div className="mt-8">
        <SocialLinks size={22} />
      </div>
    </Container>
  );
}
