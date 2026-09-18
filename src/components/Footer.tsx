import { profile } from "@/lib/profile";

export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            A designer by craft.
          </h2>
          <p className="mt-3 text-muted">{profile.availability}</p>
          <p className="mt-1 text-sm text-faint">{profile.location}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm sm:items-end">
          <a
            href={`mailto:${profile.email}`}
            className="text-ink transition hover:text-accent"
          >
            {profile.email}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-muted transition hover:text-accent"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
