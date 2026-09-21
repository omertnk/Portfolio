import Link from "next/link";
import { site } from "@/config/site";
import { Container } from "./Container";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <Container className="flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          {site.name}
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-muted transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
