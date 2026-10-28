import { createContactHandler } from "../../lib/contact-handler";
import { sendContactEmail } from "../../lib/smtp";

export const runtime = "nodejs";
export const maxDuration = 60;
export const POST = createContactHandler(sendContactEmail);
