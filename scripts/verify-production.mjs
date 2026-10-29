import assert from "node:assert/strict";

const url = process.env.VERIFY_URL || "http://127.0.0.1:3005/";
const response = await fetch(url);
assert.equal(response.status, 200, "The production preview must respond with HTTP 200");
const html = await response.text();
const scripts = [...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g)].map(match => match[1]);
assert.ok(scripts.length, "Expected Next.js runtime scripts");
assert.ok(!scripts.some(src => /hmr-client|next-devtools|node_modules_next_dist_client|react-dom-client_development/.test(src)),
  "Development bundles detected. Run npm run perf:preview and audit port 3005, not npm run dev.");
assert.ok(html.includes('rel="canonical"'), "Expected production page metadata");
console.log(`Production bundle check passed: ${url}. No HMR or development runtime detected.`);
