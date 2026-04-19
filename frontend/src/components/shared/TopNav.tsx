"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Add Flashcard", href: "/create" },
  { label: "Quiz", href: "/quiz" },
  { label: "Writing Practice", href: "/writing" },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[48px] apple-glass border-b border-white/10 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl flex items-center justify-between">
        <Link href="/" className="text-white font-semibold text-lg tracking-tighter hover:opacity-80 transition-opacity">
          Mini Flashcards
        </Link>
        <div className="flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[12px] font-normal tracking-tight transition-colors duration-200",
                  isActive ? "text-white/50 cursor-default" : "text-white/80 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
