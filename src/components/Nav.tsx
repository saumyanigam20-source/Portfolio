"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/#home", label: "Home", icon: HomeIcon },
  { href: "/#work", label: "Work", icon: WorkIcon },
  { href: "/#experiments", label: "Experiments", icon: ExperimentsIcon },
  { href: "/about", label: "About", icon: AboutIcon },
];

function activeFromPath(pathname: string) {
  if (pathname === "/about") return "/about";
  if (pathname.startsWith("/experiments")) return "/#experiments";
  return "/#home";
}

export function Nav() {
  const pathname = usePathname();
  const [active, setActive] = useState(() => activeFromPath(pathname));

  useEffect(() => {
    if (pathname === "/about") {
      setActive("/about");
      return;
    }

    if (pathname.startsWith("/experiments")) {
      setActive("/#experiments");
      return;
    }

    const sections = ["home", "work", "experiments"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActive(`/#${visible.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.4, 0.7] },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <nav
      aria-label="Page"
      className="fixed top-5 left-1/2 z-40 -translate-x-1/2 animate-fade"
    >
      <ul className="flex items-center gap-1 rounded-full border border-line bg-canvas-elevated/80 px-2 py-1.5 shadow-[0_10px_30px_rgba(28,36,28,0.12)] backdrop-blur-xl">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = active === href;
          return (
            <li key={href}>
              <Link
                href={href}
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 ${
                  isActive
                    ? "bg-accent-soft text-accent"
                    : "text-muted hover:text-ink"
                }`}
              >
                <Icon />
              </Link>
            </li>
          );
        })}
        <li className="mx-0.5 h-5 w-px bg-line" aria-hidden />
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  );
}

function ThemeToggle() {
  function toggle() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors duration-300 hover:text-ink"
    >
      <SunIcon />
      <MoonIcon />
    </button>
  );
}

function SunIcon() {
  return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="hidden dark:block">
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="dark:hidden">
      <path
        d="M16.5 14.2A6.2 6.2 0 0 1 9.8 7.5 6.2 6.2 0 1 0 16.5 14.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WorkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function ExperimentsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3.5 13.4 8.6 18.5 10 13.4 11.4 12 16.5 10.6 11.4 5.5 10 10.6 8.6 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M18 15.5 18.6 17.4 20.5 18 18.6 18.6 18 20.5 17.4 18.6 15.5 18 17.4 17.4 18 15.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AboutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M5 19.5c1.6-3.2 4-4.8 7-4.8s5.4 1.6 7 4.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
