"use client";

import { Pause, Play, Volume2 } from "lucide-react";
import { useRef, useState } from "react";

type AudioPlayerProps = {
  src: string;
};

export function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }
    await audioRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-black/35 p-3">
      <audio
        ref={audioRef}
        preload="none"
        onTimeUpdate={() => {
          if (!audioRef.current || !audioRef.current.duration) return;
          setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={src} type="audio/mpeg" />
      </audio>
      <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-zinc-800">
        <div className="h-full rounded-full bg-gradient-to-r from-amber-300/80 to-amber-500/80" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex items-center justify-between">
        <button type="button" onClick={togglePlay} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs text-zinc-200 hover:bg-white/5">
          {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />} {isPlaying ? "Pause" : "Play"}
        </button>
        <span className="inline-flex items-center gap-1 text-xs text-zinc-400"><Volume2 className="h-3.5 w-3.5" /> Preview</span>
      </div>
    </div>
  );
}
