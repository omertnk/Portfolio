import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <p className="text-sm text-muted">404</p>
      <h1 className="mt-2 text-2xl font-semibold">Page not found</h1>
      <Link href="/" className="mt-6 inline-block text-sm text-accent underline underline-offset-4">
        Back home
      </Link>
    </Container>
  );
}
