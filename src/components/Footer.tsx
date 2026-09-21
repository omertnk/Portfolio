import { site } from "@/config/site";
import { Container } from "./Container";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border py-10 text-sm text-muted">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <SocialLinks />
      </Container>
    </footer>
  );
}
