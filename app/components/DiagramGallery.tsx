"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { DiagramSummary } from "../lib/diagrams";

type GalleryItem = {
  slug: string;
  title: string;
  images: string[];
  updatedAt: string;
};

export default function DiagramGallery({ diagrams }: { diagrams: DiagramSummary[] }) {
  const items = useMemo<GalleryItem[]>(() => {
    return diagrams
      .map((diagram) => ({
        slug: diagram.slug,
        title: diagram.title,
        images: diagram.images,
        updatedAt: diagram.updatedAt,
      }))
      .filter((diagram) => diagram.images.length > 0)
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
  }, [diagrams]);

  const [openItemIndex, setOpenItemIndex] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openItem = openItemIndex !== null ? items[openItemIndex] : null;

  const openModal = (index: number) => {
    setOpenItemIndex(index);
    setCurrentImageIndex(0);
  };

  const closeModal = () => setOpenItemIndex(null);

  const goNext = () => {
    if (!openItem) return;
    setCurrentImageIndex((prev) => (prev + 1) % openItem.images.length);
  };

  const goPrevious = () => {
    if (!openItem) return;
    setCurrentImageIndex(
      (prev) => (prev - 1 + openItem.images.length) % openItem.images.length
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <button
            type="button"
            key={item.slug}
            className="group relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 text-left"
            onClick={() => openModal(index)}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <Image
                src={item.images[0]}
                alt={item.title}
                width={1200}
                height={900}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-100 transition" />
            <div className="absolute bottom-0 left-0 p-4">
              <p className="text-sm text-zinc-300">{item.images.length} imagens</p>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            </div>
          </button>
        ))}
      </div>

      {openItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-4xl rounded-2xl border border-zinc-700 bg-zinc-950 p-4 md:p-6">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-lg font-semibold text-white">{openItem.title}</h4>
              <button
                type="button"
                className="rounded-md bg-zinc-800 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-700"
                onClick={closeModal}
              >
                Fechar
              </button>
            </div>

            <div className="mt-4 relative aspect-[16/10] overflow-hidden rounded-xl">
              <Image
                src={openItem.images[currentImageIndex]}
                alt={`${openItem.title} - imagem ${currentImageIndex + 1}`}
                fill
                className="object-contain bg-zinc-900"
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goPrevious}
                  className="rounded-md bg-zinc-800 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-700"
                >
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="rounded-md bg-zinc-800 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-700"
                >
                  Próxima
                </button>
              </div>

              <p className="text-sm text-zinc-400">
                {currentImageIndex + 1} / {openItem.images.length}
              </p>

              <Link
                href={`/diagrams/${openItem.slug}`}
                className="rounded-md bg-white px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-zinc-200"
              >
                Abrir página do diagrama
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
