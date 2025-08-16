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
      
      // Handle static assets
      if (url.pathname.startsWith('/assets/') || 
          url.pathname.endsWith('.css') || 
          url.pathname.endsWith('.js') || 
          url.pathname.endsWith('.ico') || 
          url.pathname.endsWith('.webp') ||
          url.pathname.endsWith('.png') ||
          url.pathname.endsWith('.jpg') ||
          url.pathname.endsWith('.svg')) {
        
        // Try to get asset from __STATIC_CONTENT
        if (env.__STATIC_CONTENT) {
          try {
            const asset = await env.__STATIC_CONTENT.get(url.pathname.substring(1));
            if (asset) {
              const headers = new Headers();
              
              // Set appropriate content type
              if (url.pathname.endsWith('.css')) {
                headers.set('Content-Type', 'text/css');
              } else if (url.pathname.endsWith('.js')) {
                headers.set('Content-Type', 'application/javascript');
              } else if (url.pathname.endsWith('.ico')) {
                headers.set('Content-Type', 'image/x-icon');
              } else if (url.pathname.endsWith('.webp')) {
                headers.set('Content-Type', 'image/webp');
              }
              
              headers.set('Cache-Control', 'public, max-age=31536000');
              return new Response(asset, { headers });
            }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (e) {
            console.log('Asset not found:', url.pathname);
          }
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
