import { createReader } from "@keystatic/core/reader";
import path from "node:path";
import { readFile, stat } from "node:fs/promises";
import keystaticConfig from "../../keystatic.config";

export type DiagramSummary = {
  slug: string;
  title: string;
  originalAuthor?: string | null;
  shortDescription?: string | null;
  coverImage?: string | null;
  images: string[];
  updatedAt: string;
};

const reader = createReader(process.cwd(), keystaticConfig);

async function getDiagramUpdatedAt(slug: string): Promise<string> {
  const baseDir = path.join(process.cwd(), "src/content/diagrams");
  const yamlPath = path.join(baseDir, `${slug}.yaml`);
  const descriptionPath = path.join(baseDir, slug, "description.mdoc");

  const [yamlStat, descriptionStat] = await Promise.allSettled([
    stat(yamlPath),
    stat(descriptionPath),
  ]);

  const timestamps = [yamlStat, descriptionStat].flatMap((result) =>
    result.status === "fulfilled" ? [result.value.mtime.getTime()] : []
  );

  if (!timestamps.length) {
    return new Date(0).toISOString();
  }

  return new Date(Math.max(...timestamps)).toISOString();
}

async function collectImagesFromDescriptionFile(slug: string): Promise<string[]> {
  const descriptionPath = path.join(
    process.cwd(),
    "src/content/diagrams",
    slug,
    "description.mdoc"
  );

  try {
    const content = await readFile(descriptionPath, "utf8");

    const markdownImageMatches = Array.from(
      content.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)
    ).map((match) => match[1]);

    const markdocImageTagMatches = Array.from(
      content.matchAll(/\{[%{]\s*image[^%}]*src=["']([^"']+)["'][^%}]*[%}]\}/g)
    ).map((match) => match[1]);

    return [...markdownImageMatches, ...markdocImageTagMatches];
  } catch {
    return [];
  }
}

export async function getDiagramSummaries(): Promise<DiagramSummary[]> {
  const diagrams = await reader.collections.diagrams.all();

  return Promise.all(
    diagrams.map(async ({ slug, entry }) => {
      const descriptionImages = await collectImagesFromDescriptionFile(slug);
      const images = Array.from(
        new Set([...descriptionImages, entry.coverImage].filter(Boolean))
      ) as string[];

      return {
        slug,
        title: entry.title,
        originalAuthor: entry.originalAuthor,
        shortDescription: entry.shortDescription,
        coverImage: entry.coverImage,
        images,
        updatedAt: await getDiagramUpdatedAt(slug),
      };
    })
  );
}
