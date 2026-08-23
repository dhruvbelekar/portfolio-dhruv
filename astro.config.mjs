// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://dhruv-belekar.vercel.app',
  integrations: [react()],

  // /projects was its own page; the work lives on the home page now. Anyone
  // holding the old URL lands on that section rather than a 404.
  redirects: {
    '/projects': '/#projects',
  },

  vite: {
    plugins: [tailwindcss()]
  }
});