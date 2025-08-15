// Import the Remix build
import * as build from './build/server/index.js';
import { createRequestHandler } from '@remix-run/cloudflare';

// Create the request handler
const handleRequest = createRequestHandler(build, process.env.NODE_ENV);

// Export the default Worker export
export default {
  async fetch(request, env) {
    try {
      return await handleRequest(request, { env });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
};
