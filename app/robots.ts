// app/robots.txt
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/keystatic/', // Importante: Esconda o painel do Keystatic dos bots
    },
    sitemap: 'https://origami.cahenre.com.br/sitemap.xml',
  };
}