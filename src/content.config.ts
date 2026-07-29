import { defineCollection } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';
import fs from 'node:fs';
import path from 'node:path';
// @ts-ignore
import matter from 'gray-matter';

function getFiles(dir: string, baseDir: string = dir): { relativePath: string; absolutePath: string }[] {
  let results: { relativePath: string; absolutePath: string }[] = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    if (file === 'node_modules' || file === '.git') continue;
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(filePath, baseDir));
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      results.push({
        relativePath: path.relative(baseDir, filePath),
        absolutePath: filePath,
      });
    }
  }
  return results;
}

const customStarlightLoader = () => {
  return {
    name: 'custom-starlight-loader',
    load: async ({ store, renderMarkdown }: any) => {
      const docsDir = path.join(process.cwd(), 'src/content/docs');
      if (!fs.existsSync(docsDir)) return;

      const files = getFiles(docsDir);
      store.clear();

      for (const file of files) {
        if (file.relativePath.includes('node_modules') || file.relativePath.includes('dist')) continue;
        if (file.relativePath === 'docs') continue; // Skip directory symlink loop if any

        const content = fs.readFileSync(file.absolutePath, 'utf-8');
        const parsed = matter(content);

        const data = parsed.data || {};
        let body = parsed.content || '';

        // Extract title from first heading if missing and remove it from body to prevent duplicate h1 rendering
        const headingMatch = body.match(/^#\s+(.+)$/m);
        if (headingMatch) {
          if (!data.title) {
            data.title = headingMatch[1].trim();
          }
          // Remove the first H1 heading line from the markdown body
          body = body.replace(/^#\s+.+(\r?\n)?/m, '').trim();
        } else if (!data.title) {
          data.title = path.basename(file.relativePath, path.extname(file.relativePath));
        }

        // Set fallback description
        if (!data.description) {
          const descMatch = body.match(/^[^#\n].+/m);
          data.description = descMatch ? descMatch[0].slice(0, 160).trim() : 'GigPilot AI Documentation';
        }

        // CRITICAL: Explicitly set draft to false so Starlight does not filter it out in production builds!
        data.draft = false;

        // CRITICAL: Explicitly default head to an empty array to avoid undefined crashes in Starlight's head merger
        data.head = data.head || [];

        // Convert slug/id: slug should be lowercase and without extensions
        const id = file.relativePath.replace(/\.(md|mdx)$/, '').toLowerCase();

        // Render Markdown content to HTML using Astro's built-in renderMarkdown compiler
        const rendered = await renderMarkdown(body);

        store.set({
          id,
          data,
          body,
          filePath: path.relative(process.cwd(), file.absolutePath),
          rendered,
        });
      }
    },
  };
};

export const collections = {
  docs: defineCollection({
    loader: customStarlightLoader(),
    schema: docsSchema(),
  }),
};
