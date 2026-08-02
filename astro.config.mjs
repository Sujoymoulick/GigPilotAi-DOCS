import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [
    react(),
    starlight({
      title: 'GigPilot AI',
      customCss: [
        './src/styles/global.css',
      ],
      components: {
        ThemeSelect: './src/components/ThemeSelect.astro',
      },
      logo: {
        light: './src/assets/logoblack.png',
        dark: './src/assets/LogoWhite.png',
        replacesTitle: false,
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/Sujoymoulick/GigPilotAi-DOCS.git' }
      ],
      sidebar: [
        {
          label: 'Documentation',
          items: [
            { label: 'Introduction', link: 'docs/introduction' },
            { label: 'Quick Start', link: 'docs/quick_start' },
            { label: 'Authentication', link: 'docs/authentication' },
            { label: 'Database', link: 'docs/database' },
            { label: 'Supabase', link: 'docs/supabase' },
            { label: 'Storage', link: 'docs/storage' },
            { label: 'Architecture', link: 'docs/architecture' },
            { label: 'Security', link: 'docs/security' },
            { label: 'Security Audit', link: 'docs/security_audit' },
            { label: 'Rate Limits', link: 'docs/rate_limits' },
            { label: 'Error Handling', link: 'docs/error_handling' },
            { label: 'Pagination', link: 'docs/pagination' },
            { label: 'Webhooks', link: 'docs/webhooks' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'API Reference', link: 'docs/api_reference' },
            { label: 'API Index', link: 'docs/api_index' },
            { label: 'OpenAPI Spec', link: 'docs/openapi' },
            { label: 'SDK Examples', link: 'docs/sdk_examples' },
            { label: 'API Documentation', link: 'docs/api_documentation' },
          ],
        },
        {
          label: 'API Reference',
          items: [
            { label: 'Authentication', link: 'docs/api/auth' },
            { label: 'Users', link: 'docs/api/users' },
            { label: 'Projects', link: 'docs/api/projects' },
            { label: 'Gigs', link: 'docs/api/gigs' },
            { label: 'AI', link: 'docs/api/ai' },
            { label: 'Analytics', link: 'docs/api/analytics' },
            { label: 'Notifications', link: 'docs/api/notifications' },
            { label: 'Social', link: 'docs/api/social' },
            { label: 'Storage', link: 'docs/api/storage' },
            { label: 'Payments', link: 'docs/api/payments' },
            { label: 'Settings', link: 'docs/api/settings' },
            { label: 'Scheduler', link: 'docs/api/scheduler' },
            { label: 'Admin', link: 'docs/api/admin' },
            { label: 'Health', link: 'docs/api/health' },
          ],
        },
        {
          label: 'Resources',
          items: [
            { label: 'README', link: 'docs/readme' },
            { label: 'Changelog', link: 'docs/changelog' },
            { label: 'Developer Guide', link: 'docs/developer_guide' },
            { label: 'Deployment Guide', link: 'docs/deployment_guide' },
            { label: 'Environment Setup', link: 'docs/environment_setup' },
            { label: 'Folder Structure', link: 'docs/folder_structure' },
            { label: 'Folder Documentation', link: 'docs/folder_documentation' },
          ],
        },
      ],
    }),
    mdx(),
  ],
});
