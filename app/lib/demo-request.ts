import { demoFormAction } from "./content";

export type DemoResult = "accepted" | "activation";

// A 200 response alone is not an acknowledgement. FormSubmit also returns
// activation/rejection messages with HTTP 200 and string-valued success flags.
export function readDemoResponse(body: unknown): DemoResult {
  if (!body || typeof body !== "object") throw new Error("invalid-response");
  const { success, message } = body as Record<string, unknown>;
  if (typeof message !== "string" || !message.trim())
    throw new Error("invalid-response");
  if (/activat|verif|confirm.*(?:e-?mail)|(?:e-?mail).*confirm/i.test(message))
    return "activation";
  if (
    (success === true || success === "true") &&
    /^(?:the )?form (?:was )?(?:successfully submitted|submitted successfully)[.!]?$/i.test(message.trim())
  )
    return "accepted";
  throw new Error("unconfirmed-request");
}

export async function sendDemoRequest(
  fields: Record<string, string>,
  request: typeof fetch = fetch,
  timeoutMs = 20_000,
): Promise<DemoResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await request(demoFormAction, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(fields),
      signal: controller.signal,
      credentials: "omit",
      referrerPolicy: "strict-origin-when-cross-origin",
    });
    if (!response.ok) throw new Error("request-rejected");
    return readDemoResponse(await response.json());
  } finally {
    clearTimeout(timer);
  }
}
