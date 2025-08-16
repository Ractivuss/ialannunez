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
        
        // Serve static assets from the ASSETS binding
        return env.ASSETS.fetch(request);
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
