import Image from "next/image";
import Link from "next/link";
import { Download, Music2, Timer } from "lucide-react";

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
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 p-5 shadow-[0_10px_45px_-20px_rgba(0,0,0,0.7)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-amber-200/30 hover:shadow-[0_0_45px_-20px_rgba(245,158,11,0.45)]">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80 ${accentStyles[track.category]}`} />
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border border-white/15 opacity-70" />
      <div className="pointer-events-none absolute -bottom-10 -left-8 h-24 w-24 rounded-full border border-white/10" />

      <div className="relative space-y-5">
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/50">
          <Image src={track.coverImage} alt={`${track.title} cover art`} width={640} height={360} className="h-44 w-full object-cover opacity-0" />
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />
            <svg viewBox="0 0 800 450" className="absolute inset-0 h-full w-full">
              <defs>
                <linearGradient id={`${track.slug}-gradient`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
                </linearGradient>
              </defs>
              <path d="M0,335 C130,255 265,390 410,305 C515,242 645,258 800,212" stroke={`url(#${track.slug}-gradient)`} strokeWidth="2" fill="none" opacity="0.75" />
              <path d="M0,375 C170,320 250,390 420,340 C530,300 670,340 800,290" stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none" />
              <path d="M130 80 L280 70 L355 170 L180 200 Z" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" fill="none" />
              <path d="M360 120 L500 90 L610 180 L470 230 Z" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" fill="none" />
            </svg>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.24em] text-zinc-200">
            {track.category}
          </span>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-zinc-100">{track.title}</h3>
          <p className="text-sm leading-relaxed text-zinc-300">{track.description}</p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-2.5 py-1">
              <Timer className="h-3.5 w-3.5" /> {track.duration}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-2.5 py-1">
              <Music2 className="h-3.5 w-3.5" /> {track.bpm} BPM
            </span>
          </div>
        </div>

        <audio controls className="w-full rounded-lg">
          <source src={track.audioMp3} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Link
            href={track.audioMp3}
            download
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-300/40 bg-amber-300/10 px-4 py-2.5 text-sm font-medium text-amber-100 transition hover:border-amber-200/80 hover:bg-amber-200/20"
          >
            <Download className="h-4 w-4" /> Download MP3
          </Link>
          <Link
            href={track.midi}
            download
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-zinc-100 transition hover:border-white/50 hover:bg-white/10"
          >
            <Download className="h-4 w-4" /> Download MIDI
          </Link>
        </div>
      </div>
    </article>
  );
}
