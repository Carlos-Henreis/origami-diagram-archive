import { Metadata } from "next";
import OrigamiSymbolsGuide from "../components/OrigamiSymbolsGuide";

const BASE_URL = "https://origami.cahenre.com.br";

export async function generateMetadata({}: {}): Promise<Metadata> {
  const url = `${BASE_URL}/symbols`;
  const title = "Origami Symbols Legend | Folding Notation Guide";
  const description =
    "Understand every symbol used in our origami diagrams. Designed for beginners, this guide will help you read, interpret, and follow each folding step with clarity and confidence.";

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      images: [{ url: `${BASE_URL}/og-image.png` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: `${BASE_URL}/og-image.png` }],
    },
  };
}

export default async function OrigamiSymbolsPage() {
  return (
    <div className="relative isolate min-h-screen text-zinc-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.1),transparent_35%),radial-gradient(circle_at_76%_18%,rgba(99,102,241,0.08),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:54px_54px]" />
      <section className="mx-auto max-w-6xl px-6 pb-12 pt-24">
        <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
          Origami Symbols Legend
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Understand every symbol used in our origami diagrams. This guide will
          help you read, interpret, and follow each step with clarity and
          precision.
        </p>
        <div className="mb-10">
          <a
            href="/pdfs/origami-symbols-legend.pdf"
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-medium hover:opacity-90 transition"
          >
            Download Symbols Legend PDF
          </a>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <OrigamiSymbolsGuide />
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-10">
          <a
            href="/pdfs/origami-symbols-legend.pdf"
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-medium hover:opacity-90 transition"
          >
            Download Symbols Legend PDF
          </a>
        </div>
      </section>
    </div>
  );
}