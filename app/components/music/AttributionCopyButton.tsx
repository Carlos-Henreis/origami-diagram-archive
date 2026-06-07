"use client";

import { Copy } from "lucide-react";

type AttributionCopyButtonProps = {
  text: string;
};

export function AttributionCopyButton({ text }: AttributionCopyButtonProps) {
  return (
    <button
      type="button"
      className="theme-secondary-action mt-4 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition"
      onClick={() => navigator.clipboard.writeText(text)}
    >
      <Copy className="h-4 w-4" /> Copy attribution
    </button>
  );
}
