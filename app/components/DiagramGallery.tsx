"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Share2, X } from "lucide-react";
import type { DiagramSummary } from "../lib/diagrams";

type GalleryItem = {
  slug: string;
  title: string;
  images: string[];
  updatedAt: string;
};

const SWIPE_THRESHOLD = 40;

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
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [shareFeedback, setShareFeedback] = useState("");

  const openItem = openItemIndex !== null ? items[openItemIndex] : null;

  const openModal = (index: number) => {
    setOpenItemIndex(index);
    setCurrentImageIndex(0);
    setShareFeedback("");
  };

  const closeModal = useCallback(() => {
    setOpenItemIndex(null);
    setShareFeedback("");
  }, []);

  const goNext = useCallback(() => {
    if (!openItem) return;
    setCurrentImageIndex((prev) => (prev + 1) % openItem.images.length);
  }, [openItem]);

  const goPrevious = useCallback(() => {
    if (!openItem) return;
    setCurrentImageIndex(
      (prev) => (prev - 1 + openItem.images.length) % openItem.images.length
    );
  }, [openItem]);

  const handleShare = async () => {
    if (!openItem || typeof window === "undefined") return;

    const diagramUrl = `${window.location.origin}/diagrams/${openItem.slug}`;
    const text = `Veja este diagrama: ${openItem.title}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: openItem.title,
          text,
          url: diagramUrl,
        });
        setShareFeedback("Compartilhado com sucesso!");
        return;
      }

      await navigator.clipboard.writeText(diagramUrl);
      setShareFeedback("Link copiado para área de transferência.");
    } catch {
      setShareFeedback("Não foi possível compartilhar agora.");
    }
  };

  useEffect(() => {
    if (!openItem) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrevious();
      if (event.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openItem, goNext, goPrevious, closeModal]);

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
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 md:p-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-5xl rounded-2xl border border-zinc-700 bg-zinc-950 p-4 md:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h4 className="text-lg font-semibold text-white">{openItem.title}</h4>
              <button
                type="button"
                aria-label="Fechar modal"
                className="rounded-full bg-zinc-800 p-2 text-zinc-200 hover:bg-zinc-700"
                onClick={closeModal}
              >
                <X size={18} />
              </button>
            </div>

            <div
              className="relative overflow-hidden rounded-xl bg-zinc-900"
              onTouchStart={(event) => setTouchStartX(event.changedTouches[0].clientX)}
              onTouchEnd={(event) => {
                if (touchStartX === null) return;
                const touchEndX = event.changedTouches[0].clientX;
                const diff = touchEndX - touchStartX;

                if (Math.abs(diff) > SWIPE_THRESHOLD) {
                  if (diff < 0) goNext();
                  if (diff > 0) goPrevious();
                }

                setTouchStartX(null);
              }}
            >
              <div className="relative aspect-[4/3] md:aspect-[16/10]">
                <Image
                  src={openItem.images[currentImageIndex]}
                  alt={`${openItem.title} - imagem ${currentImageIndex + 1}`}
                  fill
                  className="object-contain"
                />
              </div>

              {openItem.images.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Imagem anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/65 p-3 text-white shadow-lg hover:bg-black/80"
                    onClick={goPrevious}
                  >
                    <ChevronLeft size={22} />
                  </button>

                  <button
                    type="button"
                    aria-label="Próxima imagem"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/65 p-3 text-white shadow-lg hover:bg-black/80"
                    onClick={goNext}
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}

              {openItem.images.length > 1 && (
                <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/30 px-3 py-2">
                  {openItem.images.map((image, index) => (
                    <span
                      key={image + index}
                      className={`h-2.5 w-2.5 rounded-full ${
                        index === currentImageIndex ? "bg-white" : "bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-zinc-400">
                {currentImageIndex + 1} / {openItem.images.length}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 rounded-md bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-100 hover:bg-zinc-700"
                >
                  <Share2 size={16} />
                  Compartilhar
                </button>

                <Link
                  href={`/diagrams/${openItem.slug}`}
                  className="rounded-md bg-white px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-zinc-200"
                >
                  Abrir página do diagrama
                </Link>
              </div>
            </div>

            {shareFeedback && (
              <p className="mt-2 text-sm text-emerald-400">{shareFeedback}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
