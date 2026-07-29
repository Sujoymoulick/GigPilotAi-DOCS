import type { APIRoute } from 'astro';
import { getAllDocSlugs, readDocFile } from '../lib/markdown';

export const GET: APIRoute = () => {
  const slugs = getAllDocSlugs();
  const index: Array<{ title: string; href: string; excerpt: string; slug: string }> = [];

  for (const slug of slugs) {
    const markdown = readDocFile(slug);
    if (!markdown) continue;

    const titleMatch  = markdown.match(/^#\s+(.+)$/m);
    const title       = titleMatch ? titleMatch[1] : slug;

    // Extract first meaningful paragraph
    const lines   = markdown.split('\n').filter(l => l.trim() && !l.startsWith('#') && !l.startsWith('```') && !l.startsWith('|'));
    const excerpt = lines[0]?.slice(0, 120) ?? '';

    const href = slug.startsWith('api/') ? `/docs/${slug}` : `/docs/${slug}`;

    index.push({ title, href, excerpt, slug });
  }

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
};
