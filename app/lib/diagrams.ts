import { createReader } from "@keystatic/core/reader";
import path from "node:path";
import { stat } from "node:fs/promises";
import keystaticConfig from "../../keystatic.config";

type MarkdocNode = {
  name?: string;
  attributes?: Record<string, unknown>;
  children?: MarkdocNode[];
};

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

function collectImagesFromNode(node?: MarkdocNode): string[] {
  if (!node) return [];

  const images: string[] = [];
  const walk = (current: MarkdocNode) => {
    if (current.name === "image") {
      const src = current.attributes?.src;
      if (typeof src === "string") {
        images.push(src);
      }
    }

    current.children?.forEach(walk);
  };

  walk(node);
  return images;
}

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

export async function getDiagramSummaries(): Promise<DiagramSummary[]> {
  const diagrams = await reader.collections.diagrams.all();

  return Promise.all(
    diagrams.map(async ({ slug, entry }) => {
      const { node } = await entry.description();
      const contentImages = collectImagesFromNode(node as MarkdocNode);
      const images = Array.from(
        new Set([entry.coverImage, ...contentImages].filter(Boolean))
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
