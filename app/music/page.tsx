import type { Metadata } from "next";
import Link from "next/link";
import { Music4, Sparkles } from "lucide-react";
import { MusicCard, type MusicTrack } from "../components/music/MusicCard";
import { SectionTitle } from "../components/music/SectionTitle";
import { AttributionCopyButton } from "../components/music/AttributionCopyButton";
import Image from "next/image";

const tracks: MusicTrack[] = [
  {
    title: "Origami Ambient Loop",
    slug: "origami-ambient-loop",
    category: "Ambient",
    description:
      "Relaxing ambient loop with soft pads and gentle textures. Perfect for calm tutorials and focus.",
    duration: "00:15",
    bpm: "72",
    coverImage: "/images/music/origami-audio-archive.webp",
    audioMp3: "/audio/origami-ambient-loop.mp3",
    midi: "/audio/origami-ambient-loop.mid",
  },
  {
    title: "Origami Diagram Archive Theme",
    slug: "origami-diagram-archive-theme",
    category: "Theme",
    description:
      "The official theme of the Origami Diagram Archive. Clean, modern, and inspiring.",
    duration: "00:07",
    bpm: "80",
    coverImage: "/images/music/origami-audio-archive.webp",
    audioMp3: "/audio/origami-diagram-archive-theme.mp3",
    midi: "/audio/origami-diagram-archive-theme.mid",
  },
  {
    title: "Origami Fusion Loop",
    slug: "origami-fusion-loop",
    category: "Fusion",
    description:
      "Upbeat fusion loop with Japanese jazz influences. Ideal for energetic and creative sessions.",
    duration: "00:43",
    bpm: "72",
    coverImage: "/images/music/origami-audio-archive.webp",
    audioMp3: "/audio/origami-fusion-loop.mp3",
    midi: "/audio/origami-fusion-loop.mid",
  },
];

export function generateMetadata(): Metadata {
  const title = "Origami Audio Archive | Origami Diagram Archive";
  const description =
    "Discover royalty-free ambient loops and original soundtracks crafted for origami tutorials and creative projects.";

  return {
    title,
    description,
    keywords: [
      "origami music",
      "royalty free music",
      "origami soundtrack",
      "ambient loop",
      "japanese fusion music",
      "tutorial background music",
      "origami audio archive",
    ],
    openGraph: {
      title,
      description,
      url: "https://origami.cahenre.com.br/music",
      siteName: "Origami Diagram Archive",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function MusicPage() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.12),transparent_38%),radial-gradient(circle_at_72%_16%,rgba(20,184,166,0.12),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:54px_54px]" />

      <section className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-14 pt-16 md:pt-24 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-amber-300/5 px-4 py-1 text-xs uppercase tracking-[0.24em] text-amber-200/90">
            <Sparkles className="h-3.5 w-3.5" /> Sound Library
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">Origami Audio Archive</h1>
          <p className="text-base text-zinc-300 sm:text-lg">
            Royalty-free music, ambient loops, and original soundtracks created for origami tutorials and creative projects.
          </p>
          <p className="text-sm text-amber-100/85">Free to use with attribution.</p>
        </div>

        <div className="relative mx-auto h-72 w-full max-w-md rounded-3xl h-full w-full text-white/80">
          <Image src="/images/music/origami-audio-archive.webp" alt="Origami Audio Archive cover art" className="object-cover" width={300} height={300} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8">
        <SectionTitle
          eyebrow="Collection"
          title="Royalty-free tracks for creators"
          description="Three polished sound pieces for tutorials, streams, and creative media. Each track includes MP3 and MIDI downloads."
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {tracks.map((track) => (
            <MusicCard key={track.slug} track={track} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionTitle eyebrow="License" title="Simple attribution license" />
        <div className="rounded-2xl border border-amber-100/20 bg-zinc-900/60 p-6 backdrop-blur-md">
          <p className="mb-5 flex items-center gap-2 text-zinc-200"><Music4 className="h-4 w-4 text-amber-200" />All tracks are free to use in videos, tutorials, streams, and creative projects with attribution.</p>
          <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-zinc-300">
            <p>Music by Origami Diagram Archive</p>
            <p>https://origami.cahenre.com.br/</p>
          </div>
          <AttributionCopyButton text={"Music by Origami Diagram Archive\nhttps://origami.cahenre.com.br/"} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <SectionTitle eyebrow="Explore" title="Continue exploring the archive" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link href="/diagrams" className="rounded-2xl border border-white/10 bg-zinc-900/70 p-6 transition hover:border-amber-200/30 hover:bg-zinc-800/80">
            <h3 className="text-lg font-medium text-zinc-100">Diagram Collection</h3>
            <p className="mt-1 text-sm text-zinc-400">Browse tutorials and diagram remakes.</p>
          </Link>
          <Link href="/origami-symbols" className="rounded-2xl border border-white/10 bg-zinc-900/70 p-6 transition hover:border-amber-200/30 hover:bg-zinc-800/80">
            <h3 className="text-lg font-medium text-zinc-100">Origami Symbols</h3>
            <p className="mt-1 text-sm text-zinc-400">Learn the universal folding notation system.</p>
          </Link>
        </div>
      </section>

    </div>
  );
}
