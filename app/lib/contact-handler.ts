import { createHash } from "node:crypto";
import { validateContact, type ContactInput } from "./contact-validation";

type Mailer = (input: ContactInput) => Promise<{ accepted: boolean; messageId: string }>;
const buckets = new Map<string, { count: number; expires: number }>();

// Best effort per warm instance; deployment-wide controls belong in Vercel WAF.
function allowRequest(request: Request) {
  const now = Date.now();
  for (const [key, bucket] of buckets) if (bucket.expires <= now) buckets.delete(key);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const key = createHash("sha256").update(ip).digest("hex");
  const bucket = buckets.get(key);
  if (bucket) return ++bucket.count <= 5;
  if (buckets.size >= 1000) return false;
  buckets.set(key, { count: 1, expires: now + 600_000 });
  return true;
}

function json(body: object, status = 200, extra = {}) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...extra } });
}

async function readBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("EMPTY");
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 8192) { await reader.cancel(); throw new Error("TOO_LARGE"); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return JSON.parse(new TextDecoder().decode(bytes)) as unknown;
}

export function createContactHandler(deliver: Mailer, permit = allowRequest) {
  return async function handle(request: Request) {
    if (request.method !== "POST") return json({ success: false }, 405, { Allow: "POST" });
    const url = new URL(request.url);
    const host = request.headers.get("host") || url.host;
    const protocol = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() || url.protocol.slice(0, -1);
    // Next.js may construct request.url with its internal hostname. Compare
    // against the incoming host/protocol so localhost, custom domains and
    // Vercel HTTPS previews work through the platform's reverse proxy.
    if (!["http", "https"].includes(protocol) || request.headers.get("origin") !== `${protocol}://${host}` || request.headers.get("sec-fetch-site") === "cross-site") return json({ success: false }, 403);
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return json({ success: false }, 415);
    if (!permit(request)) return json({ success: false, code: "RATE_LIMITED" }, 429, { "Retry-After": "600" });
    let input: ContactInput | null;
    try { input = validateContact(await readBody(request)); }
    catch (error) { return json({ success: false }, error instanceof Error && error.message === "TOO_LARGE" ? 413 : 400); }
    if (!input) return json({ success: false, code: "INVALID_FIELDS" }, 400);
    try {
      const result = await deliver(input);
      if (!result.accepted || !result.messageId) throw new Error("UNCONFIRMED");
      return json({ success: true, messageId: result.messageId });
    } catch {
      // Never expose SMTP errors, credentials or the submitted personal data.
      return json({ success: false, code: "SEND_FAILED" }, 502);
    }
  };
}
