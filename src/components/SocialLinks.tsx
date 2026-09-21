import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, YoutubeIcon, ItchioIcon } from "./icons";
import { site } from "@/config/site";

const items = [
  { href: site.socials.github, label: "GitHub", Icon: GithubIcon },
  { href: site.socials.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: site.socials.itchio, label: "itch.io", Icon: ItchioIcon },
  { href: site.socials.youtube, label: "YouTube", Icon: YoutubeIcon },
  { href: site.email ? `mailto:${site.email}` : "", label: "Email", Icon: Mail },
].filter((i) => i.href);

export function SocialLinks({ size = 18 }: { size?: number }) {
  return (
    <ul className="flex items-center gap-4">
      {items.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noreferrer"
            aria-label={label}
            title={label}
            className="text-muted transition hover:text-foreground"
          >
            <Icon size={size} />
          </a>
        </li>
      ))}
    </ul>
  );
}
