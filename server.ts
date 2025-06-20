import { serve } from '@hono/node-server';
import app from './lib/hono-app.js';

console.log('Starting Hono server on port 3002...');

serve({
  fetch: app.fetch,
  port: 3002,
}, (info) => {
  console.log(`Hono server running at http://localhost:${info.port}`);
});