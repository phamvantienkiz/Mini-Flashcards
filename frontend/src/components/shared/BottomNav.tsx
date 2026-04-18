"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Plus, BookOpen, PenTool } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Plus, label: "Add", href: "/create" },
  { icon: BookOpen, label: "Quiz", href: "/quiz" },
  { icon: PenTool, label: "Writing", href: "/writing" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-md">
      <div className="glass rounded-2xl border border-white/20 shadow-xl flex items-center justify-around py-3 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all duration-300 relative",
                isActive ? "text-primary" : "text-stone-500 hover:text-stone-900"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 transition-transform duration-300",
                  isActive && "scale-110"
                )}
              />
              <span className="text-[10px] font-medium uppercase tracking-tighter">
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
