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
      const url = new URL(request.url);
      
      // Try to serve static assets first if KV is available
      if (url.pathname.includes('.') && !url.pathname.endsWith('.html') && env.__STATIC_CONTENT) {
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
          console.log('Asset not found in KV, falling back to Remix handler:', e.message);
        }
      }

      // Handle Remix routes
      return await handleRequest(request, { env });
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(`Internal Server Error: ${error.message}`, { 
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  },
};
