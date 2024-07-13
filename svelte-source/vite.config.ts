import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import WindiCSS from 'vite-plugin-windicss';
import { minify } from 'html-minifier';
import viteCompression from 'vite-plugin-compression';

const minifyHtml = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      return minify(html, {
        collapseWhitespace: true,
      });
    },
  };
};

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [
      WindiCSS(),
      svelte(),
      isProduction && minifyHtml(),
      // Uncomment and configure viteCompression when needed
      // isProduction && viteCompression({ algorithm: 'brotliCompress', ext: '.bz' }),
    ],
    base: './', // Adjust as per your project needs
    build: {
      minify: isProduction,
      emptyOutDir: true,
      outDir: '../html', // Adjust output directory as needed
      assetsDir: './', // Adjust assets directory relative to outDir
      rollupOptions: {
        output: {
          // By not having hashes in the name, you don't have to update the manifest
          entryFileNames: `[name].js`,
          chunkFileNames: `[name].js`,
          assetFileNames: `[name].[ext]`,
        },
      },
    },
  };
});
