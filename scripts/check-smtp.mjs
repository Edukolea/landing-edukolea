import nextEnv from "@next/env";
import nodemailer from "nodemailer";
import { loadTypeScript } from "./load-ts.mjs";
nextEnv.loadEnvConfig(process.cwd(), false, { info() {}, error() {} });
const { smtpConfig, sendContactEmail } = await loadTypeScript("app/lib/smtp.ts");
let transport;
try {
  transport = nodemailer.createTransport(smtpConfig());
  await transport.verify();
  console.log("SMTP: DNS, TLS and authentication verified.");
  if (process.argv.includes("--send-test")) {
    const result = await sendContactEmail({ name: "Prueba técnica EduKole", profile: "otro", institution: "Verificación de Nodemailer", service: "aula_lista_ia", method: "email", contact: "contacto@edukolea.com" });
    console.log(`SMTP test to contacto@edukolea.com: accepted=${result.accepted}, messageId=${Boolean(result.messageId)}. Check the inbox/spam to confirm delivery.`);
  }
} catch (error) {
  const code = typeof error?.code === "string" ? error.code : error?.message === "SMTP_CONFIGURATION" ? "SMTP_CONFIGURATION" : "SMTP_FAILED";
  console.error(`SMTP check failed (${code}). Credentials and server responses are not printed.`);
  process.exitCode = 1;
} finally { transport?.close(); }
