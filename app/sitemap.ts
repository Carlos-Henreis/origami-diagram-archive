import { MetadataRoute } from "next";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://origami.cahenre.com.br";
  const diagrams = await reader.collections.diagrams.all();

  const diagramEntries = diagrams.map((post) => ({
    url: `${baseUrl}/diagrams/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...diagramEntries,
  ];
}
