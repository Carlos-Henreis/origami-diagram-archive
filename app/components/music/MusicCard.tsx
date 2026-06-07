import Image from "next/image";
import { Download, Music2, Timer } from "lucide-react";
import { AudioPlayer } from "./AudioPlayer";

export type MusicTrack = {
  title: string;
  slug: string;
  category: "Ambient" | "Theme" | "Fusion";
  description: string;
  duration: string;
  bpm: string;
  coverImage: string;
  audioMp3: string;
  midi: string;
};

type MusicCardProps = {
  track: MusicTrack;
};

const accentStyles: Record<MusicTrack["category"], string> = {
  Ambient: "from-cyan-500/20 via-teal-400/10 to-sky-500/15",
  Theme: "from-amber-400/20 via-yellow-300/10 to-orange-500/20",
  Fusion: "from-indigo-500/20 via-blue-500/10 to-violet-500/20",
};

export function MusicCard({ track }: MusicCardProps) {
  return (
    <article className="theme-card theme-card-interactive group relative overflow-hidden rounded-2xl border p-5 backdrop-blur-md">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80 ${accentStyles[track.category]}`} />
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border border-white/15 opacity-70" />
      <div className="pointer-events-none absolute -bottom-10 -left-8 h-24 w-24 rounded-full border border-white/10" />

      <div className="relative space-y-5">
        <div className="relative overflow-hidden rounded-xl">
          <Image src={track.coverImage} alt={`${track.title} cover art`} width={400} height={400} className="h-44 w-full object-cover opacity-70" />
         
          <div className="absolute inset-0" />
          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.24em] [color:rgba(255,255,255,0.86)]">
            {track.category}
          </span>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-zinc-100">{track.title}</h3>
          <p className="theme-copy text-sm leading-relaxed">{track.description}</p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-2.5 py-1">
              <Timer className="h-3.5 w-3.5" /> {track.duration}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-2.5 py-1">
              <Music2 className="h-3.5 w-3.5" /> {track.bpm} BPM
            </span>
          </div>
        </div>

        <AudioPlayer src={track.audioMp3} />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <a
            href={track.audioMp3}
            download
            className="theme-primary-action inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition"
          >
            <Download className="h-4 w-4" /> Download MP3
          </a>
          <a
            href={track.midi}
            download
            className="theme-secondary-action inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition"
          >
            <Download className="h-4 w-4" /> Download MIDI
          </a>
        </div>
      </div>
    </article>
  );
}
