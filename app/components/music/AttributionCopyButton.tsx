"use client";

import { Copy } from "lucide-react";

type AttributionCopyButtonProps = {
  text: string;
};

export function AttributionCopyButton({ text }: AttributionCopyButtonProps) {
  return (
    <button
      type="button"
      className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-sm text-zinc-100 transition hover:bg-white/10"
      onClick={() => navigator.clipboard.writeText(text)}
    >
      <Copy className="h-4 w-4" /> Copy attribution
    </button>
  );
}
