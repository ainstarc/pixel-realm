/**
 * Vite configuration for Pixel Realm
 * 
 * Configures the build process and deployment settings.
 * The base path is set to match the GitHub Pages repository name.
 */

import { defineConfig } from 'vite';

export default defineConfig({
  base: '/pixel-realm/', // Must match your repository name
  build: {
    outDir: 'dist',
  }
});