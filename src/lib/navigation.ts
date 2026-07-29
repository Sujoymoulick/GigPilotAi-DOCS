import fs from 'node:fs';
import path from 'node:path';

export interface NavItem {
  label: string;
  slug: string;
  href: string;
  order: number;
}

export interface NavSection {
  label: string;
  items: NavItem[];
  icon?: string;
}

// Map filenames to human-readable labels and ordering
const DOCS_META: Record<string, { label: string; order: number; icon?: string }> = {
  'INTRODUCTION':       { label: 'Introduction',       order: 1 },
  'QUICK_START':        { label: 'Quick Start',         order: 2 },
  'AUTHENTICATION':     { label: 'Authentication',      order: 3 },
  'DATABASE':           { label: 'Database',            order: 4 },
  'SUPABASE':           { label: 'Supabase',            order: 5 },
  'STORAGE':            { label: 'Storage',             order: 6 },
  'ARCHITECTURE':       { label: 'Architecture',        order: 7 },
  'SECURITY':           { label: 'Security',            order: 8 },
  'SECURITY_AUDIT':     { label: 'Security Audit',      order: 9 },
  'RATE_LIMITS':        { label: 'Rate Limits',         order: 10 },
  'ERROR_HANDLING':     { label: 'Error Handling',      order: 11 },
  'PAGINATION':         { label: 'Pagination',          order: 12 },
  'WEBHOOKS':           { label: 'Webhooks',            order: 13 },
  'API_REFERENCE':      { label: 'API Reference',       order: 20 },
  'API_INDEX':          { label: 'API Index',           order: 21 },
  'API_DOCUMENTATION':  { label: 'API Documentation',   order: 22 },
  'SDK_EXAMPLES':       { label: 'SDK Examples',        order: 23 },
  'OPENAPI':            { label: 'OpenAPI Spec',        order: 24 },
  'CHANGELOG':          { label: 'Changelog',           order: 30 },
  'DEVELOPER_GUIDE':    { label: 'Developer Guide',     order: 31 },
  'DEPLOYMENT_GUIDE':   { label: 'Deployment Guide',    order: 32 },
  'ENVIRONMENT_SETUP':  { label: 'Environment Setup',   order: 33 },
  'FOLDER_STRUCTURE':   { label: 'Folder Structure',    order: 34 },
  'FOLDER_DOCUMENTATION': { label: 'Folder Documentation', order: 35 },
  'README':             { label: 'README',              order: 99 },
};

const API_META: Record<string, { label: string; order: number }> = {
  'auth':          { label: 'Authentication',    order: 1 },
  'users':         { label: 'Users',             order: 2 },
  'projects':      { label: 'Projects',          order: 3 },
  'gigs':          { label: 'Gigs',              order: 4 },
  'ai':            { label: 'AI',                order: 5 },
  'analytics':     { label: 'Analytics',         order: 6 },
  'notifications': { label: 'Notifications',     order: 7 },
  'social':        { label: 'Social',            order: 8 },
  'storage':       { label: 'Storage',           order: 9 },
  'payments':      { label: 'Payments',          order: 10 },
  'settings':      { label: 'Settings',          order: 11 },
  'scheduler':     { label: 'Scheduler',         order: 12 },
  'admin':         { label: 'Admin',             order: 13 },
  'health':        { label: 'Health',            order: 14 },
};

function getDocsPath(): string {
  // Works both from src/ and from root
  const candidates = [
    path.join(process.cwd(), 'docs'),
    path.join(process.cwd(), '../docs'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return path.join(process.cwd(), 'docs');
}

export function buildNavigation(): NavSection[] {
  const docsPath = getDocsPath();

  // --- General docs ---
  const generalItems: NavItem[] = [];
  const skip = new Set(['README.md', 'API_INDEX.md', 'API_REFERENCE.md', 'API_DOCUMENTATION.md', 'OPENAPI.md']);

  if (fs.existsSync(docsPath)) {
    const files = fs.readdirSync(docsPath).filter(f => f.endsWith('.md') && !skip.has(f));
    for (const file of files) {
      const name = file.replace('.md', '');
      const meta = DOCS_META[name];
      if (!meta) continue;
      generalItems.push({
        label: meta.label,
        slug:  name.toLowerCase(),
        href:  `/docs/${name.toLowerCase()}`,
        order: meta.order,
      });
    }
  }
  generalItems.sort((a, b) => a.order - b.order);

  // Reference docs
  const referenceItems: NavItem[] = [
    { label: 'API Reference',     slug: 'api_reference',     href: '/docs/api_reference',     order: 1 },
    { label: 'API Index',         slug: 'api_index',         href: '/docs/api_index',         order: 2 },
    { label: 'OpenAPI Spec',      slug: 'openapi',           href: '/docs/openapi',           order: 3 },
    { label: 'SDK Examples',      slug: 'sdk_examples',      href: '/docs/sdk_examples',      order: 4 },
    { label: 'API Documentation', slug: 'api_documentation', href: '/docs/api_documentation', order: 5 },
  ].filter(item => {
    const file = path.join(docsPath, `${item.slug.toUpperCase()}.md`);
    return fs.existsSync(file);
  });

  // --- API docs ---
  const apiItems: NavItem[] = [];
  const apiPath = path.join(docsPath, 'api');
  if (fs.existsSync(apiPath)) {
    const files = fs.readdirSync(apiPath).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const name = file.replace('.md', '');
      const meta = API_META[name] ?? { label: name.charAt(0).toUpperCase() + name.slice(1), order: 50 };
      apiItems.push({
        label: meta.label,
        slug:  name,
        href:  `/docs/api/${name}`,
        order: meta.order,
      });
    }
  }
  apiItems.sort((a, b) => a.order - b.order);

  const sections: NavSection[] = [];

  // Split general into sub-groups
  const coreItems    = generalItems.filter(i => i.order <= 13);
  const changeItems  = generalItems.filter(i => i.order >= 30);

  if (coreItems.length)   sections.push({ label: 'Documentation', items: coreItems });
  if (referenceItems.length) sections.push({ label: 'Reference',  items: referenceItems });
  if (apiItems.length)    sections.push({ label: 'API',           items: apiItems });
  if (changeItems.length) sections.push({ label: 'Resources',    items: changeItems });

  return sections;
}

export function flatNav(sections: NavSection[]): NavItem[] {
  return sections.flatMap(s => s.items);
}

export function getAdjacentPages(sections: NavSection[], currentHref: string): {
  prev: NavItem | null;
  next: NavItem | null;
} {
  const all = flatNav(sections);
  const idx = all.findIndex(i => i.href === currentHref);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}
