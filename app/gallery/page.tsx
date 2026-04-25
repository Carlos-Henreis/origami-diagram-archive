import { Metadata } from "next";
import DiagramGallery from "../components/DiagramGallery";
import { getDiagramSummaries } from "../lib/diagrams";

const BASE_URL = "https://origami.cahenre.com.br";


/* ============================= */
/* METADATA */
/* ============================= */

export async function generateMetadata({
}: {
}): Promise<Metadata> {


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
      images: [{ url: `${BASE_URL}/twitter-image.png` }],
    },
  };
}

export default async function GalleryPage() {
  const diagrams = await getDiagramSummaries();

  return (
    <main className="bg-zinc-950 text-zinc-100 min-h-screen">
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
    </main>
  );
}