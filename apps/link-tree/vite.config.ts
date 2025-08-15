import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import path from 'path';

declare module '@remix-run/cloudflare' {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  root: __dirname,
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'app'),
      '@lib': path.resolve(__dirname, 'app/lib'),
      '@utils': path.resolve(__dirname, 'app/utils'),
      '@hooks': path.resolve(__dirname, 'app/hooks'),
      '@atoms': path.resolve(__dirname, 'app/components/atoms'),
      '@molecules': path.resolve(__dirname, 'app/components/molecules'),
      '@organisms': path.resolve(__dirname, 'app/components/organisms'),
    },
  },
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    nxViteTsPaths(),
  ],
});
