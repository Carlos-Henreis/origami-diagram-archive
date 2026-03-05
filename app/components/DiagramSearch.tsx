"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";


export default function DiagramSearch({ diagrams }: any) {
  const [query, setQuery] = useState("");


  const filtered = useMemo(() => {
    return diagrams.filter((d: any) =>
      d.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, diagrams]);

  console.log("Diagrams for search:", filtered);

  return (
    <div className="space-y-8">
      {/* Barra de Busca */}
      <div className="relative mb-12">
        <input
          type="text"
          placeholder="Search diagrams (e.g., A4, Crane, Dragon)..."
          className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-lg px-4 py-3 
                     focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length > 0 ? (
          filtered.map(( entry: any) => (
              <Link
                key={entry.slug}
                href={`/diagrams/${entry.slug}`}
                className="group block rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition"
              >
                {/* Image */}
                {entry.coverImage && (
                  <div className="overflow-hidden">
                    <Image
                      src={entry.coverImage}
                      alt={entry.title}
                      width={1000}
                      height={800}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                )}

                {/* Content */}
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
            No diagrams found for "{query}"
          </p>
        )}
      </div>
    </div>
  );
}