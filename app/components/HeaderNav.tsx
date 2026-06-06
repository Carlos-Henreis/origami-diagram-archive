"use client";

import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/", label: "Diagrams" },
  { href: "/gallery", label: "Gallery" },
  { href: "/origami-symbols", label: "Origami Symbols" },
  { href: "/music", label: "Music" },
];

type Theme = "dark" | "light";

const THEME_STORAGE_KEY = "origami-diagram-archive-theme";

export function HeaderNav() {
  const [open, setOpen] = useState(false);

  const toggleTheme = () => {
    const currentTheme =
      document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const nextTheme: Theme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  };

  return (
    <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
      <div className="flex items-center gap-3 md:order-2">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
          onClick={toggleTheme}
          aria-label="Toggle color theme"
          title="Toggle color theme"
        >
          <Sun className="theme-icon-sun h-4 w-4" />
          <Moon className="theme-icon-moon h-4 w-4" />
        </button>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-900 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="site-nav"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />} Menu
        </button>
      </div>

      <nav
        id="site-nav"
        className={`${open ? "flex" : "hidden"} flex-col gap-2 md:mt-0 md:flex md:flex-row md:items-center`}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
