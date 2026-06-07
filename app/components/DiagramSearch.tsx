"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { DiagramSummary } from "../lib/diagrams";

type SortOption = "recent" | "alphabetical" | "oldest";

const sortLabels: Record<SortOption, string> = {
  recent: "most recent",
  alphabetical: "A–Z",
  oldest: "Oldest",
};

export default function DiagramSearch({ diagrams }: { diagrams: DiagramSummary[] }) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const filtered = useMemo(() => {
    const result = diagrams.filter((d) =>
      d.title.toLowerCase().includes(query.toLowerCase())
    );

    result.sort((a, b) => {
      if (sortBy === "alphabetical") {
        return a.title.localeCompare(b.title, "pt-BR");
      }

      const diff =
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();

      return sortBy === "oldest" ? diff : -diff;
    });

    return result;
  }, [query, diagrams, sortBy]);

  return (
    <div className="space-y-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Search diagrams (e.g., tsuru, star, box)..."
          className="theme-input w-full rounded-xl border px-4 py-3 transition-all focus:outline-none"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {(Object.keys(sortLabels) as SortOption[]).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setSortBy(option)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              sortBy === option
                ? "theme-chip-active"
                : "theme-chip"
            }`}
          >
            {sortLabels[option]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length > 0 ? (
          filtered.map((entry) => (
            <Link
              key={entry.slug}
              href={`/diagrams/${entry.slug}`}
              className="theme-card theme-card-interactive group block overflow-hidden rounded-2xl border"
            >
              {entry.coverImage && (
                <div className="overflow-hidden aspect-[4/3]">
                  <Image
                    src={entry.coverImage}
                    alt={entry.title}
                    width={1000}
                    height={800}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-medium group-hover:text-zinc-100 transition">
                  {entry.title}
                </h3>

                {entry.shortDescription && (
                  <p className="theme-copy mt-3 line-clamp-3 text-sm leading-relaxed">
                    {entry.shortDescription}
                  </p>
                )}

                {entry.originalAuthor && (
                  <p className="theme-copy mt-4 text-xs">
                    Original by {entry.originalAuthor}
                  </p>
                )}
              </div>
            </Link>
          ))
        ) : (
          <p className="theme-copy col-span-full py-10 text-center">
            No diagrams found for &quot;{query}&quot;
          </p>
        )}
      </div>
    </div>
  );
}