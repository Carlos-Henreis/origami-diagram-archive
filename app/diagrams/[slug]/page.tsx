import * as React from "react";
import { notFound } from "next/navigation";
import Markdoc from "@markdoc/markdoc";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../../keystatic.config";
import { Metadata } from "next";
import Accordion from "../../components/Accordion";
import Link from 'next/link';
// Se estiver usando lucide-react (comum em projetos shadcn/tailwind)
import { ArrowLeft, BookOpen } from "lucide-react";

const reader = createReader(process.cwd(), keystaticConfig);
const BASE_URL = "https://origami.cahenre.com.br";

type Params = Promise<{ slug: string }>;

/* ============================= */
/* METADATA */
/* ============================= */

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;

  const diagram = await reader.collections.diagrams.read(slug);
  if (!diagram) return {};

  const url = `${BASE_URL}/diagrams/${slug}`;

  return {
    title: `${diagram.title} | Origami Diagram Archive`,
    description: diagram.shortDescription,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      title: diagram.title,
      description: diagram.shortDescription,
      url,
      images: diagram.coverImage
        ? [{ url: `${BASE_URL}${diagram.coverImage}` }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: diagram.title,
      description: diagram.shortDescription,
      images: diagram.coverImage
        ? [`${BASE_URL}${diagram.coverImage}`]
        : [],
    },
  };
}
/* ============================= */
/* MARKDOC COMPONENTS */
/* ============================= */


export default async function DiagramPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;

  const diagram = await reader.collections.diagrams.read(slug);
  if (!diagram) return notFound();

  const { node } = await diagram.description();
  const content = Markdoc.transform(node);

  return (
    <div className="relative isolate min-h-screen text-zinc-200">
      <div className="theme-hero-wash pointer-events-none absolute inset-0" />
      <div className="theme-grid pointer-events-none absolute inset-0" />
      <main className="relative max-w-3xl mx-auto px-6 py-16">
      {/* Container centralizado igual ao seu conteúdo */}
      <div className="max-w-3xl mx-auto">
        
        {/* Botão Voltar */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Archive
        </Link>
        </div>
      {/* Title */}
      <h1 className="text-4xl font-bold tracking-tight mb-6">
        {diagram.title}
      </h1>

      {/* Download Button */}
      {diagram.pdf && (
        <div className="mb-10">
          <a
            href={diagram.pdf}
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-medium hover:opacity-90 transition"
          >
            Download PDF diagram
          </a>
        </div>
      )}
      {/* Symbols Guide CTA */}
      <div className="my-10 rounded-2xl border border-white/10 bg-zinc-900/70 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-100">
              New to origami diagrams?
            </h2>
            <p className="mt-1 text-sm leading-6 text-zinc-400">
              Learn the symbols and folding notation used in our diagrams before
              following the steps.
            </p>
          </div>

          <Link
            href="/origami-symbols"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:opacity-90"
          >
            <BookOpen size={16} />
            Symbols Guide
          </Link>
        </div>
      </div>
      {/* Description */}
      {content && (
        <article className="prose prose-invert max-w-none">
          {Markdoc.renderers.react(content, React)}
        </article>
      )}
      {/* Download Button */}
      {diagram.pdf && (
        <div className="mb-10">
          <a
            href={diagram.pdf}
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-medium hover:opacity-90 transition"
          >
            Download PDF diagram
          </a>
        </div>
      )}
      {diagram.pdf && (
        <Accordion
          items={[
            {
              title: "Viewing the Diagrams",
              content: (
                <div className="mb-16">
                  <iframe
                    src={diagram.pdf}
                    className="w-full h-[800px] rounded-xl border border-white/10"
                  />
                </div>
              ),
            }
          ]}
        />
      )}


    </main>
    </div>
  );
}

/* ============================= */
/* STATIC PARAMS */
/* ============================= */

export async function generateStaticParams() {
  const slugs = await reader.collections.diagrams.list();
  return slugs.map((slug) => ({ slug }));
}

function normalizeImgSrc(src?: string) {
  if (!src) return src;
  if (src.startsWith("/") || src.startsWith("http://") || src.startsWith("https://"))
    return src;
  // seu padrão: public/artigos => /artigos
  return `/diagrams/${src}`;
}