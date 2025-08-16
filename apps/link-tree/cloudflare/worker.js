// Import the Remix build
import * as build from '../build/server/index.js';
import { createRequestHandler } from '@remix-run/cloudflare';

// Create the request handler
const handleRequest = createRequestHandler(build, process.env.NODE_ENV);

// Export the default Worker export
export default {
  async fetch(request, env) {
    try {
      // Let Cloudflare's site bucket handle static assets automatically
      // Only handle Remix routes in the worker
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
