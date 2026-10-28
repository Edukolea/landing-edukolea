import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";

const compile = source => ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const moduleUrl = source => `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
const contentUrl = moduleUrl(compile(await readFile("app/lib/content.ts", "utf8")));
const source = compile(await readFile("app/lib/demo-request.ts", "utf8")).replace('"./content"', JSON.stringify(contentUrl));
const { readDemoResponse, sendDemoRequest } = await import(moduleUrl(source));

for (const success of [true, "true"]) {
  assert.equal(readDemoResponse({ success, message: "The form was successfully submitted." }), "accepted");
  assert.equal(readDemoResponse({ success, message: "Form submitted successfully." }), "accepted");
  assert.equal(readDemoResponse({ success, message: "Please activate your form by confirming your email." }), "activation");
}
assert.equal(readDemoResponse({ success: false, message: "This form needs Activation." }), "activation");
for (const body of [null, "OK", {}, { success: true }, { success: "false", message: "Form successfully submitted." }, { success: true, message: "Unknown status" }, { success: true, message: "The form was not successfully submitted." }, { success: 1, message: "Form successfully submitted." }]) {
  assert.throws(() => readDemoResponse(body), "Do not invent a confirmation for ambiguous/rejected replies");
}
let calls = 0;
const fields = { name: "Prueba local", service: "AulaLista IA", email: "test@example.invalid" };
const result = await sendDemoRequest(fields, async (url, options) => {
  calls++;
  assert.equal(url, "https://formsubmit.co/ajax/contacto@edukolea.com");
  assert.equal(options.method, "POST");
  assert.equal(options.credentials, "omit");
  assert.deepEqual(JSON.parse(options.body), fields);
  return Response.json({ success: "true", message: "The form was successfully submitted." });
});
assert.equal(result, "accepted");
assert.equal(calls, 1);
for (const response of [new Response("server error", { status: 503 }), new Response("<html>not JSON</html>"), Response.json({ success: false, message: "Rejected" })]) {
  await assert.rejects(sendDemoRequest(fields, async () => response));
}
await assert.rejects(sendDemoRequest(fields, async () => { throw new TypeError("Network unavailable"); }));
await assert.rejects(sendDemoRequest(fields, async (_, options) => new Promise((resolve, reject) => {
  options.signal.addEventListener("abort", () => reject(new DOMException("Timed out", "AbortError")), { once: true });
}), 10), { name: "AbortError" });
console.log("Demo verified: recipient, JSON POST, strict confirmation, activation, rejection, invalid JSON, network failure and timeout. No external requests made.");
