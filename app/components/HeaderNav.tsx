"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/", label: "Diagrams" },
  { href: "/gallery", label: "Gallery" },
  { href: "/origami-symbols", label: "Origami Symbols" },
  { href: "/music", label: "Music" },
];

export function HeaderNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full md:w-auto">
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-900 md:hidden"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="site-nav"
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />} Menu
      </button>

      <nav
        id="site-nav"
        className={`${open ? "mt-3 flex" : "hidden"} flex-col gap-2 md:mt-0 md:flex md:flex-row md:items-center`}
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
