// Import the Remix build and asset handler
import * as build from './build/server/index.js';
import { createRequestHandler } from '@remix-run/cloudflare';
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

// Create the request handler
const handleRequest = createRequestHandler(build, process.env.NODE_ENV);

// Export the default Worker export
export default {
  async fetch(request, env, ctx) {
    try {
      // Try to serve static assets first
      const url = new URL(request.url);
      
      // If it's a static asset (has file extension), try to serve from KV
      if (url.pathname.includes('.') && !url.pathname.endsWith('.html')) {
        try {
          return await getAssetFromKV(
            {
              request,
              waitUntil: ctx.waitUntil.bind(ctx),
            },
            {
              ASSET_NAMESPACE: env.__STATIC_CONTENT,
              ASSET_MANIFEST: env.__STATIC_CONTENT_MANIFEST,
            }
          );
        } catch (e) {
          // If asset not found, continue to Remix handler
        }
      }

      // Handle Remix routes
      return await handleRequest(request, { env });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
};
