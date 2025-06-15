
/**
 * Vite configuration for Pixel Realm (TypeScript version)
 */

import { defineConfig } from 'vite';

export default defineConfig({
  base: '/pixel-realm/', // Must match your GitHub repo name for GitHub Pages
  build: {
    outDir: 'dist'
  }
});
