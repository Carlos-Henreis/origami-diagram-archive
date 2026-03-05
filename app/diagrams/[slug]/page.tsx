import * as React from "react";
import { notFound } from "next/navigation";
import Markdoc from "@markdoc/markdoc";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../../keystatic.config";
import { Metadata } from "next";
import Accordion from "../../components/Accordion";
import Link from 'next/link';
// Se estiver usando lucide-react (comum em projetos shadcn/tailwind)
import { ArrowLeft } from 'lucide-react';

const reader = createReader(process.cwd(), keystaticConfig);

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

  return {
    title: diagram.title,
    description: diagram.shortDescription,
    alternates: { canonical: `/diagrams/${slug}` },
    openGraph: {
      type: "article",
      title: diagram.title,
      description: diagram.shortDescription,
      url: `/diagrams/${slug}`,
      images: diagram.coverImage
        ? [{ url: diagram.coverImage }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: diagram.title,
      description: diagram.shortDescription,
      images: diagram.coverImage
        ? [diagram.coverImage]
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
    <main className="max-w-3xl mx-auto px-6 py-16 text-zinc-200">
      {/* Container centralizado igual ao seu conteúdo */}
      <div className="max-w-3xl mx-auto">
        
        {/* Botão Voltar */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group"
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