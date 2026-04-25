import DiagramGallery from "../components/DiagramGallery";
import { getDiagramSummaries } from "../lib/diagrams";

export default async function GalleryPage() {
  const diagrams = await getDiagramSummaries();

  return (
    <main className="bg-zinc-950 text-zinc-100 min-h-screen">
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-12">
        <h2 className="text-5xl md:text-6xl font-semibold tracking-tight">
          Galeria de Publicações
        </h2>
        <p className="mt-6 text-lg text-zinc-400 max-w-2xl leading-relaxed">
          Explore as imagens mais recentes dos diagramas. Clique em qualquer card
          para abrir um modal com carrossel e acessar a publicação completa.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <DiagramGallery diagrams={diagrams} />
      </section>
    </main>
  );
}
