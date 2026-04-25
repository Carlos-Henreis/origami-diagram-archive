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
      console.log("Sorting by", sortBy, a.title, b.title);
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
          className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
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
                ? "bg-white text-zinc-900"
                : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
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
              className="group block rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition"
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
                <h3 className="text-xl font-medium group-hover:text-white transition">
                  {entry.title}
                </h3>

                {entry.shortDescription && (
                  <p className="mt-3 text-sm text-zinc-400 leading-relaxed line-clamp-3">
                    {entry.shortDescription}
                  </p>
                )}

                {entry.originalAuthor && (
                  <p className="mt-4 text-xs text-zinc-500">
                    Original by {entry.originalAuthor}
                  </p>
                )}
              </div>
            </Link>
          ))
        ) : (
          <p className="text-zinc-500 col-span-full text-center py-10">
            No diagrams found for &quot;{query}&quot;
          </p>
        )}
      </div>
    </div>
  );
}