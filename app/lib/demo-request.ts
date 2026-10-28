import { demoFormAction } from "./content";

export type DemoResult = "accepted";

// Only our server's explicit SMTP acknowledgement can confirm a submission.
export function readDemoResponse(body: unknown): DemoResult {
  if (!body || typeof body !== "object") throw new Error("invalid-response");
  const { success, messageId } = body as Record<string, unknown>;
  if (
    success === true && typeof messageId === "string" && messageId.trim().length > 0
  )
    return "accepted";
  throw new Error("unconfirmed-request");
}

export async function sendDemoRequest(
  fields: Record<string, string>,
  request: typeof fetch = fetch,
  timeoutMs = 45_000,
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
      credentials: "same-origin",
      referrerPolicy: "strict-origin-when-cross-origin",
    });
    if (!response.ok) throw new Error("request-rejected");
    return readDemoResponse(await response.json());
  } finally {
    clearTimeout(timer);
  }
}
