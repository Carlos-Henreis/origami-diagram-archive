// app/sitemap.ts
import { MetadataRoute } from 'next';
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../keystatic.config';

// 1. Instanciamos o reader do Keystatic
const reader = createReader(process.cwd(), keystaticConfig);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://origami.cahenre.com.br'; // Substitua pelo seu domínio real

  // 2. Buscamos todos os diagramas do Keystatic
  const diagrams = await reader.collections.diagrams.all();

  // 3. Mapeamos os diagramas para o formato do sitemap
  const diagramEntries = diagrams.map((post) => ({
    url: `${baseUrl}/diagrams/${post.slug}`,
    lastModified: new Date(), // Ou use uma data vinda do frontmatter se tiver
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 4. Adicionamos as páginas estáticas (Home, About, etc.)
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...diagramEntries,
  ];
}