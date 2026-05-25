import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      // We manage all @tailwind directives ourselves in src/styles/globals.css
      applyBaseStyles: false,
    }),
    react(),
  ],
  image: {
    // Allow Astro <Image /> to optimise assets from src/assets/
    remotePatterns: [],
  },
});
