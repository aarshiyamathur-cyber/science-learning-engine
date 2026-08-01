"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NAV_LINKS = [
  { href: "/", label: "Executive Dashboard" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/sprint-history", label: "Sprint History" },
  { href: "/release-centre", label: "Release Centre" },
  { href: "/question-bank", label: "Question Bank" },
  { href: "/engineering", label: "Engineering Dashboard" },
] as const;

export function Nav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="flex w-64 shrink-0 flex-col gap-1 bg-slate-900 p-4 text-slate-100"
    >
      <div className="mb-4 px-2 text-lg font-bold tracking-tight">Command Centre</div>
      {NAV_LINKS.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-slate-700 text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
