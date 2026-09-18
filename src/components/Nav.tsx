"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/#home", label: "Home", icon: HomeIcon },
  { href: "/#work", label: "Work", icon: WorkIcon },
  { href: "/#about", label: "About", icon: AboutIcon },
];

export function Nav() {
  const [active, setActive] = useState("/#home");

  useEffect(() => {
    const sections = ["home", "work", "about"];
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
  }, []);

  return (
    <nav
      aria-label="Page"
      className="fixed top-5 left-1/2 z-40 -translate-x-1/2 animate-fade"
    >
      <ul className="flex items-center gap-1 rounded-full border border-line bg-[rgba(14,16,15,0.72)] px-2 py-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
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
      </ul>
    </nav>
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
