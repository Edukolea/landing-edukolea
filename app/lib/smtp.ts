import "server-only";
import nodemailer from "nodemailer";
import { contactEmail, services } from "./content";
import type { ContactInput } from "./contact-validation";

export function smtpConfig(env: NodeJS.ProcessEnv = process.env) {
  const host = env.SMTP_HOST?.trim();
  const user = env.SMTP_USER?.trim();
  const pass = env.SMTP_PASSWORD;
  const port = Number(env.SMTP_PORT || 465);
  if (!host || !user || !pass || ![465, 587].includes(port)) throw new Error("SMTP_CONFIGURATION");
  return {
    host, port, secure: port === 465, requireTLS: true,
    auth: { user, pass }, connectionTimeout: 8000, greetingTimeout: 8000,
    socketTimeout: 10000, dnsTimeout: 5000,
    tls: { minVersion: "TLSv1.2" as const, rejectUnauthorized: true },
    logger: false, debug: false,
  };
}

export function contactMessage(input: ContactInput, sender: string) {
  const service = services.find(item => item.slug === input.service)!;
  return {
    from: { name: "EduKole", address: sender },
    to: contactEmail,
    ...(input.method === "email" ? { replyTo: input.contact } : {}),
    subject: `Nueva solicitud de demo · ${service.name}`,
    text: [
      "Nueva solicitud desde la landing de EduKole", "",
      `Nombre: ${input.name}`, `Perfil: ${input.profile}`,
      `Institución: ${input.institution || "No indicada"}`, `Servicio: ${service.name}`,
      `Medio preferido: ${input.method === "email" ? "Correo electrónico" : "WhatsApp"}`,
      `Contacto: ${input.contact}`, "", "Consentimiento para coordinar la demo: aceptado.",
    ].join("\n"),
    disableFileAccess: true, disableUrlAccess: true,
  };
}

export async function sendContactEmail(input: ContactInput) {
  const config = smtpConfig();
  const transport = nodemailer.createTransport(config);
  try {
    const result = await transport.sendMail(contactMessage(input, config.auth.user));
    const accepted = result.accepted.some(address =>
      String(address).toLowerCase() === contactEmail.toLowerCase(),
    );
    if (!accepted || result.rejected.length || !result.messageId) throw new Error("SMTP_UNCONFIRMED");
    return { accepted: true, messageId: result.messageId };
  } finally {
    transport.close();
  }
}
