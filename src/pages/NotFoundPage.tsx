import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-32 text-center">
      <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">404</p>
      <h1 className="font-heading text-3xl font-medium text-ink md:text-4xl">Page not found</h1>
      <Link to="/" className="mt-6 inline-block text-accent hover:underline">
        Back home
      </Link>
    </div>
  );
}
