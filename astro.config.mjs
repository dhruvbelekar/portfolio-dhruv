// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.dhruvbelekar.com',

  // /projects was its own page; the work lives on the home page now. Anyone
  // holding the old URL lands on that section rather than a 404.
  redirects: {
    '/projects': '/#projects',
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});