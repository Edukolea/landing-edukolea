import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";

// Execute the real module with browser storage doubles, without any receiver.
const source = await readFile("app/lib/measurement.ts", "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { preserveCampaign, measure } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
const storage = new Map();
const emitted = [];
globalThis.window = { location: { search: "" }, dispatchEvent: event => emitted.push(event.detail) };
globalThis.sessionStorage = { setItem: (key, value) => storage.set(key, value) };
const key = "edukole:campaign";
window.location.search = "?utm_source=instagram&utm_medium=organic_social&utm_campaign=lanzamiento_2026_10&utm_content=post_01&email=private@example.com&utm_term=secret";
preserveCampaign();
assert.deepEqual(JSON.parse(storage.get(key)), { utm_source: "instagram", utm_medium: "organic_social", utm_campaign: "lanzamiento_2026_10", utm_content: "post_01" });
window.location.search = "";
preserveCampaign();
assert.equal(JSON.parse(storage.get(key)).utm_source, "instagram", "Keep attribution through reload/anchors");
window.location.search = "?utm_source=private@example.com&utm_campaign=51999999999&utm_content=person_name&utm_medium=unknown";
preserveCampaign();
assert.ok(!storage.get(key).includes("private"), "Never store arbitrary campaign or personal values");
window.location.search = "?utm_source=linkedin&utm_medium=paid_social";
preserveCampaign();
assert.deepEqual(JSON.parse(storage.get(key)), { utm_source: "linkedin", utm_medium: "paid_social" }, "New attribution replaces old values");
sessionStorage.setItem = () => { throw new Error("Storage blocked"); };
assert.doesNotThrow(preserveCampaign);
measure({ event: "demo_cta_click", placement: "hero" });
measure({ event: "service_interest_select", service_slug: "kolea_reporta" });
measure({ event: "contact_outbound_click", contact_method: "email" });
assert.deepEqual(emitted, [
  { event: "demo_cta_click", placement: "hero" },
  { event: "service_interest_select", service_slug: "kolea_reporta" },
  { event: "contact_outbound_click", contact_method: "email" },
]);
assert.ok(!emitted.some(event => event.event === "generate_lead"));
console.log("Measurement verified: controlled attribution, persistence, blocked storage and local non-lead events.");
