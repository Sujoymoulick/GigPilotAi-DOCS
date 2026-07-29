import type { APIRoute } from 'astro';
import { getAllDocSlugs } from '../lib/markdown';

export const GET: APIRoute = ({ site }) => {
  const base = site ? site.toString().replace(/\/$/, '') : 'https://docs.gigpilot.ai';
  const slugs = getAllDocSlugs();

  const urls = [
    `<url><loc>${base}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`,
    ...slugs.map(slug => {
      const href = slug.startsWith('api/') ? `/docs/${slug}` : `/docs/${slug}`;
      return `<url><loc>${base}${href}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`;
    })
  ].join('\n    ');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
