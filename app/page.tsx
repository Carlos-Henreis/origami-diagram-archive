import DiagramSearch from "./components/DiagramSearch";
import Accordion from "./components/Accordion";
import { getDiagramSummaries } from "./lib/diagrams";
import { Metadata } from "next";

/* ============================= */
/* METADATA */
/* ============================= */
const BASE_URL = "https://origami.cahenre.com.br";
export async function generateMetadata(): Promise<Metadata> {
  const url = `${BASE_URL}`;

  return {
    title: "Origami Diagram Archive",
    description: "A curated archive of reconstructed classic and historical origami diagrams, carefully redrawn and preserved.",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      title: "Origami Diagram Archive",
      description: "A curated archive of reconstructed classic and historical origami diagrams, carefully redrawn and preserved.",
      url,
      images: [{ url: `${BASE_URL}/og-image.png` }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Origami Diagram Archive",
      description: "A curated archive of reconstructed classic and historical origami diagrams, carefully redrawn and preserved.",
      images: [{ url: `${BASE_URL}/og-image.png` }],
    },
  };
}

export default async function HomePage() {
  const diagrams = await getDiagramSummaries();

  return (
    <div className="relative isolate min-h-screen text-zinc-100">
      <div className="theme-hero-wash pointer-events-none absolute inset-0" />
      <div className="theme-grid pointer-events-none absolute inset-0" />
      <section className="relative max-w-6xl mx-auto px-6 pt-24 pb-16">
        <h2 className="text-5xl md:text-6xl font-semibold tracking-tight">
          Classic Origami Remakes
        </h2>

        <p className="mt-6 text-lg text-zinc-400 max-w-2xl leading-relaxed">
          A curated archive of reconstructed classic and historical origami
          diagrams, carefully redrawn and preserved.
        </p>
      </section>

      <section className="relative max-w-6xl mx-auto px-6 pb-24">
        <DiagramSearch diagrams={diagrams} />
      </section>

      <section className="relative max-w-6xl mx-auto px-6 pb-16">
        <h3 className="text-5xl md:text-6xl font-semibold tracking-tight pb-6">
          About This project
        </h3>

        <Accordion
          items={[
            {
              title: "What is this project?",
              content: (
                <p>
                  This archive contains reconstructed classic origami diagrams.
                </p>
              ),
            },
            {
              title: "Can I download the PDF?",
              content: (
                <p>
                  Yes. Each diagram includes a high-resolution PDF for download.
                </p>
              ),
            },
            {
              title: "Are these original designs?",
              content: (
                <p>
                  No. These are carefully redrawn remakes of historical diagrams.
                </p>
              ),
            },
          ]}
        />
      </section>
    </div>
  );
}