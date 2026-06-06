import { Metadata } from "next";
import DiagramGallery from "../components/DiagramGallery";
import { getDiagramSummaries } from "../lib/diagrams";

const BASE_URL = "https://origami.cahenre.com.br";


/* ============================= */
/* METADATA */
/* ============================= */

export async function generateMetadata(): Promise<Metadata> {
  const url = `${BASE_URL}/gallery`;

  return {
    title: "Image Gallery | Origami Diagram Archive",
    description: "Explore the latest images from our origami diagram collection. Click on any card to open a modal with a carousel and access the full publication.",   
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      title: "Image Gallery | Origami Diagram Archive",
      description: "Explore the latest images from our origami diagram collection. Click on any card to open a modal with a carousel and access the full publication.",
      url,
      images: [{ url: `${BASE_URL}/og-image.png` }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Image Gallery | Origami Diagram Archive",
      description: "Explore the latest images from our origami diagram collection. Click on any card to open a modal with a carousel and access the full publication.",
      images: [{ url: `${BASE_URL}/og-image.png` }],
    },
  };
}

export default async function GalleryPage() {
  const diagrams = await getDiagramSummaries();

  return (
    <div className="relative isolate min-h-screen text-zinc-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.1),transparent_35%),radial-gradient(circle_at_76%_18%,rgba(59,130,246,0.08),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:54px_54px]" />
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-12">
        <h2 className="text-5xl md:text-6xl font-semibold tracking-tight">
            Image Gallery
        </h2>
        <p className="mt-6 text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Explore the latest images from our origami diagram collection. Click on any card to open a modal with a carousel and access the full publication.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <DiagramGallery diagrams={diagrams} />
      </section>
    </div>
  );
}