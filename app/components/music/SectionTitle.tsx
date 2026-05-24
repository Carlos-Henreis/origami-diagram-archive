import { ReactNode } from "react";

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  rightSlot?: ReactNode;
};

export function SectionTitle({ eyebrow, title, description, rightSlot }: SectionTitleProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
      <div className="space-y-3">
        {eyebrow ? (
          <p className="text-xs uppercase tracking-[0.22em] text-amber-300/80">{eyebrow}</p>
        ) : null}
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">{title}</h2>
        {description ? <p className="max-w-2xl text-sm text-zinc-400 sm:text-base">{description}</p> : null}
      </div>
      {rightSlot ? <div>{rightSlot}</div> : null}
    </div>
  );
}
