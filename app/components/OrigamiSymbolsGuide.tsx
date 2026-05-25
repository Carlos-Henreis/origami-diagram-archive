"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownUp,
  ArrowRight,
  CircleDot,
  Maximize2,
  MousePointerClick,
  PlayCircle,
  Repeat,
  RotateCcw,
  Search,
  X,
} from "lucide-react";

type SymbolCategory =
  | "Basic Folds"
  | "Folding Actions"
  | "Orientation"
  | "Paper Handling"
  | "Intermediate Folds"
  | "Diagram Tools";

type OrigamiSymbol = {
  id: string;
  term: string;
  category: SymbolCategory;
  symbol: string; // now represents image path (svg)
  description: string;
  videoUrl?: string;
  note?: string;
};

const symbols: OrigamiSymbol[] = [
  {
    id: "valley-fold-line",
    term: "Valley fold line",
    category: "Basic Folds",
    symbol: "/symbols/g2.svg",
    description:"Indicates where a valley fold should be made. The paper is folded toward you along this line.",
    videoUrl: "U8eTpQC4zJw",
  },
  {
    id: "fold-direction",
    term: "Fold in the direction of the arrow",
    category: "Folding Actions",
    symbol: "/symbols/g1.svg",
    description:
      "Shows the direction in which a flap, edge, or corner should be folded.",
    videoUrl: "U8eTpQC4zJw",
  },
  {
    id: "valley-fold",
    term: "Valley fold",
    category: "Basic Folds",
    symbol: "/symbols/g64.svg",
    description:
      "A basic fold where the paper is folded toward you, forming a V-shaped crease (Valley fold).",
    videoUrl: "U8eTpQC4zJw", 
  },
  {
    id: "mountain-fold-line",
    term: "Mountain fold line",
    category: "Basic Folds",
    symbol: "/symbols/g30.svg",
    description:
      "Indicates where a mountain fold should be made. The paper is folded away from you along this line.",
    videoUrl: "bFC6Hg3UTmI",
  },
  {
    id: "fold-behind",
    term: "Fold behind",
    category: "Folding Actions",
    symbol: "/symbols/g31.svg",
    description:
      "Fold the indicated flap or section behind the visible layer of the model.",
    videoUrl: "bFC6Hg3UTmI",
  },
  {
    id: "mountain-fold",
    term: "Mountain fold",
    category: "Basic Folds",
    symbol: "/symbols/g62.svg",
    description:
      "A basic fold where the paper is folded away from you, forming a ridge like a mountain peak.",
    videoUrl: "bFC6Hg3UTmI",
  },
  {
    id: "fold-and-unfold",
    term: "Fold and unfold",
    category: "Folding Actions",
    symbol: "/symbols/g32.svg",
    description:
      "Create a crease and then unfold the paper. The crease will be used as a reference in later steps.",
    videoUrl: "Iikl4MnQQUs",
  },
  {
    id: "turn-over",
    term: "Turn the paper over",
    category: "Orientation",
    symbol: "/symbols/g69.svg",
    description:
      "Flip the model to the opposite side without changing its orientation unless another instruction says so.",
    videoUrl: "ezrX05ecrSs",
  },
  {
    id: "push-here",
    term: "Push here",
    category: "Paper Handling",
    symbol: "/symbols/g70.svg",
    description:
      "Indicates the exact area where pressure should be applied to shape, collapse, or open part of the model.",
    videoUrl: "QDWUT6wAzv8",
  },
  {
    id: "sink-fold",
    term: "Sink fold",
    category: "Intermediate Folds",
    symbol: "/symbols/g78.svg",
    description:
      "Learn how to perform a precise Sink Fold, one of the most advanced and important techniques used in origami diagrams. A Sink Fold allows part of the paper to collapse inward, creating cleaner structures and enabling complex geometric and organic forms.",
    videoUrl: "QDWUT6wAzv8",
  },
  {
    id: "inflate",
    term: "Inflate",
    category: "Paper Handling",
    symbol: "/symbols/g71.svg",
    description:
      "Expand the model by blowing air into it or by gently opening its volume with your fingers.",
    videoUrl: "lnsl1_LdRNY",
  },
  {
    id: "rotate-90-clockwise",
    term: "Rotate the model 90° clockwise",
    category: "Orientation",
    symbol: "/symbols/rect86.svg",
    description:
      "Rotate the entire model 90 degrees clockwise before continuing to the next step.",
    videoUrl: "cV3_qMaz8QI",
  },
  {
    id: "rotate-90-counterclockwise",
    term: "Rotate the model 90° counterclockwise",
    category: "Orientation",
    symbol: "/symbols/g23.svg",
    description:
      "Rotate the entire model 90 degrees counterclockwise before continuing to the next step.",
    videoUrl: "cV3_qMaz8QI",
  },
  {
    id: "cut-along-line",
    term: "Cut along the line",
    category: "Diagram Tools",
    symbol: "/symbols/g68.svg",
    description: "Cut the paper following the indicated line.",
    videoUrl: "zIqMeoylU-A",
  },
  {
    id: "enlarged-view",
    term: "Enlarged view",
    category: "Diagram Tools",
    symbol: "/symbols/g67.svg",
    description:
      "Shows a magnified area of the model to clarify a small or detailed step.",
  },
  {
    id: "pleat-fold",
    term: "Pleat fold",
    category: "Intermediate Folds",
    symbol: "/symbols/g66.svg",
    description:
      "A combination of valley and mountain folds that creates a zigzag or accordion-like fold.",
    videoUrl: "dfqFEXwy7WE",
  },
  {
    id: "inside-reverse-fold",
    term: "Inside reverse fold",
    category: "Intermediate Folds",
    symbol: "/symbols/g112.svg",
    description:
      "Reverse a point or flap inward by opening the layers and pushing the tip inside the model.",
    videoUrl: "S28eiiYvOq8",
  },
  {
    id: "outside-reverse-fold",
    term: "Outside reverse fold",
    category: "Intermediate Folds",
    symbol: "/symbols/rect27.svg",
    description:
      "Reverse a point or flap outward around the outside of the model.",
    videoUrl: "OxKkhxoy2ws",
  },
  {
    id: "insert-into-pocket",
    term: "Insert into pocket",
    category: "Paper Handling",
    symbol: "/symbols/rect242.svg",
    description:
      "Insert one flap, point, or unit into a pocket formed by another layer or module.",
    videoUrl: "a9krMRg6T50",
  }
];

const categories = [
  "All",
  "Basic Folds",
  "Folding Actions",
  "Orientation",
  "Paper Handling",
  "Intermediate Folds",
  "Diagram Tools",
] as const;

const categoryIcon: Record<string, React.ElementType> = {
  "Basic Folds": ArrowDownUp,
  "Folding Actions": ArrowRight,
  Orientation: RotateCcw,
  "Paper Handling": MousePointerClick,
  "Intermediate Folds": Repeat,
};

export default function OrigamiSymbolsGuide() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [selected, setSelected] = useState<OrigamiSymbol | null>(null);

  const filteredSymbols = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return symbols.filter((symbol) => {
      const matchesCategory = category === "All" || symbol.category === category;
      const matchesQuery =
        !normalizedQuery ||
        symbol.term.toLowerCase().includes(normalizedQuery) ||
        symbol.category.toLowerCase().includes(normalizedQuery) ||
        symbol.description.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div>
      <div className="sticky top-0 z-20 py-5 backdrop-blur">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by symbol, fold, or action..."
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 py-4 pl-12 pr-4 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-zinc-500"
            />
          </label>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
                  category === item
                    ? "border-zinc-100 bg-zinc-100 text-zinc-950"
                    : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-600 hover:text-zinc-100"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSymbols.map((symbol) => {
          const Icon = categoryIcon[symbol.category] ?? CircleDot;

          return (
            <button
              key={symbol.id}
              onClick={() => setSelected(symbol)}
              className="group rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 text-left transition hover:-translate-y-1 hover:border-zinc-600 hover:bg-zinc-900"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950">
                  <img src={symbol.symbol} alt={symbol.term} className="h-10 w-10 object-contain" />
                </div>

                <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-500">
                  {symbol.category}
                </span>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-medium text-zinc-100">{symbol.term}</h2>
                <p className="mt-4 line-clamp-3 text-sm leading-6 text-zinc-400">
                  {symbol.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm text-zinc-400">
                <PlayCircle className="h-4 w-4" />
                <span>View details</span>
              </div>
            </button>
          );
        })}
      </div>

      {filteredSymbols.length === 0 && (
        <div className="mt-16 rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">
          <p className="text-lg font-medium text-zinc-100">No symbols found.</p>
          <p className="mt-2 text-zinc-500">Try another search term or remove the selected category.</p>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-zinc-800 p-6">
              <div>
                <p className="text-sm text-zinc-500">{selected.category}</p>
                <h2 className="mt-1 text-2xl font-semibold text-zinc-100">{selected.term}</h2>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="rounded-full border border-zinc-800 p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-100"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid max-h-[calc(92vh-96px)] overflow-y-auto lg:grid-cols-[0.9fr_1.1fr]">
              <div className="border-b border-zinc-800 p-6 lg:border-b-0 lg:border-r">
                <div className="aspect-square rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden">
                  <img
                    src={selected.symbol}
                    alt={selected.term}
                    className="h-full w-full object-contain p-6"
                  />
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
                      Meaning
                    </h3>
                    <p className="mt-2 leading-7 text-zinc-300">{selected.description}</p>
                  </div>
                </div>

                {selected.videoUrl ? (
                  <div className="mt-8">
                    <h3 className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
                      Video demonstration
                    </h3>

                    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-black shadow-lg">
                      <iframe
                        className="aspect-video w-full"
                        src= {`https://www.youtube.com/embed/${selected.videoUrl}`}
                        title={`${selected.term} demonstration`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
                    <div className="flex items-center gap-3 text-zinc-300">
                      <Maximize2 className="h-5 w-5" />
                      <h3 className="font-medium">Video demonstration</h3>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      Add a video URL to this symbol to display a short demonstration inside this modal.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
