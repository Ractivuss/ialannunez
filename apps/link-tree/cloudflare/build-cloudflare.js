#!/usr/bin/env node

import { copyFileSync, existsSync } from 'fs';
import { join } from 'path';

const projectRoot = process.cwd();

// Copy the Cloudflare entry server to replace the Node.js one
const cloudflareEntry = join(projectRoot, 'app', 'entry.server.cloudflare.tsx');
const targetEntry = join(projectRoot, 'app', 'entry.server.tsx');

if (existsSync(cloudflareEntry)) {
  console.log('📦 Copying Cloudflare entry server...');
  copyFileSync(cloudflareEntry, targetEntry);
  console.log('✅ Cloudflare entry server copied');
} else {
  console.error('❌ Cloudflare entry server not found');
  process.exit(1);
}

console.log('🚀 Ready for Cloudflare Workers deployment');
