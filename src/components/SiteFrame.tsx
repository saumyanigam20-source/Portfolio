"use client";

import { usePathname } from "next/navigation";
import { AsideBot } from "@/components/aside/AsideBot";
import { Nav } from "@/components/Nav";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = pathname === "/prototype/vehicle-recorder" || pathname.startsWith("/prototype/");

  if (bare) return children;

  return (
    <>
      <div className="noise" aria-hidden />
      <Nav />
      {children}
      <AsideBot />
    </>
  );
}
