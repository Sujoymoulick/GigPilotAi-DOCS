import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

export interface TocItem {
  id:       string;
  text:     string;
  level:    number;
  children: TocItem[];
}

function getDocsPath(): string {
  const candidates = [
    path.join(process.cwd(), 'docs'),
    path.join(process.cwd(), '../docs'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return path.join(process.cwd(), 'docs');
}

function resolveDocPath(slug: string): string | null {
  const docsPath = getDocsPath();
  // slug examples: "introduction", "api/auth", "api_reference"
  const normalized = slug.replace(/^docs\//, '');

  const candidates = [
    path.join(docsPath, `${normalized.toUpperCase()}.md`),
    path.join(docsPath, `${normalized}.md`),
    path.join(docsPath, normalized.replace('/', path.sep).toUpperCase() + '.md'),
    path.join(docsPath, normalized.replace('/', path.sep) + '.md'),
  ];

  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return null;
}

export function readDocFile(slug: string): string | null {
  const docPath = resolveDocPath(slug);
  if (!docPath) return null;
  return fs.readFileSync(docPath, 'utf-8');
}

export function extractToc(markdown: string): TocItem[] {
  const tokens = marked.lexer(markdown);
  const items: TocItem[] = [];

  for (const token of tokens) {
    if (token.type === 'heading') {
      const text = token.text.replace(/`/g, '');
      const id   = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      items.push({ id, text, level: token.depth, children: [] });
    }
  }

  // Build tree for h2/h3
  const tree: TocItem[] = [];
  for (const item of items) {
    if (item.level === 2) {
      tree.push(item);
    } else if (item.level === 3 && tree.length > 0) {
      tree[tree.length - 1].children.push(item);
    }
  }
  return tree;
}

export function estimateReadingTime(markdown: string): number {
  const words = markdown.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getLastModified(slug: string): string | null {
  const docPath = resolveDocPath(slug);
  if (!docPath) return null;
  const stat = fs.statSync(docPath);
  return stat.mtime.toISOString();
}

export function getAllDocSlugs(): string[] {
  const docsPath = getDocsPath();
  const slugs: string[] = [];

  if (!fs.existsSync(docsPath)) return slugs;

  // Root level
  const files = fs.readdirSync(docsPath).filter(f => f.endsWith('.md') && f !== 'README.md');
  for (const f of files) {
    slugs.push(f.replace('.md', '').toLowerCase());
  }

  // api/ subdirectory
  const apiPath = path.join(docsPath, 'api');
  if (fs.existsSync(apiPath)) {
    const apiFiles = fs.readdirSync(apiPath).filter(f => f.endsWith('.md'));
    for (const f of apiFiles) {
      slugs.push(`api/${f.replace('.md', '').toLowerCase()}`);
    }
  }

  return slugs;
}
