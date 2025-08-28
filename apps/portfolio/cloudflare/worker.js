// Import the Remix build
import * as build from '../build/server/index.js';
import { createRequestHandler } from '@remix-run/cloudflare';

// Create the request handler
const handleRequest = createRequestHandler(build, process.env.NODE_ENV);

// Export the default Worker export
export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      
      // Handle static assets first (CSS, JS, images, etc.)
      if (url.pathname.startsWith('/assets/') || 
          url.pathname.endsWith('.css') || 
          url.pathname.endsWith('.js') || 
          url.pathname.endsWith('.ico') || 
          url.pathname.endsWith('.webp') ||
          url.pathname.endsWith('.png') ||
          url.pathname.endsWith('.jpg') ||
          url.pathname.endsWith('.svg')) {
        
        // Try to serve from the site bucket using env.ASSETS
        try {
          if (env.ASSETS) {
            const asset = await env.ASSETS.fetch(request);
            console.log(`Serving asset from ASSETS: ${url.pathname}, status: ${asset.status}`);
            return asset;
          }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          console.log(`ASSETS binding not available, trying site bucket...`);
        }
        
        // Fallback: try to serve from site bucket directly
        // This should work with the [site] configuration
        try {
          const response = await fetch(request);
          console.log(`Serving asset from site bucket: ${url.pathname}, status: ${response.status}`);
          return response;
        } catch (error) {
          console.error(`Error serving asset ${url.pathname}:`, error);
          return new Response(`Asset not found: ${url.pathname}`, { 
            status: 404,
            headers: { 'Content-Type': 'text/plain' }
          });
        }
      }
      
      // Handle Remix routes
      return await handleRequest(request, { env });
    } catch (error) {
      console.error('Worker error:', error.message, error.stack);
      return new Response(`Remix Worker Error: ${error.message}\n\nStack: ${error.stack}`, { 
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  },
};
