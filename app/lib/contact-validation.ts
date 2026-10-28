import { services, type ServiceSlug } from "./content";

export type ContactInput = {
  name: string;
  profile: "docente" | "directivo" | "otro";
  institution: string;
  service: ServiceSlug;
  method: "email" | "whatsapp";
  contact: string;
};

const text = (value: unknown, max: number, optional = false): value is string =>
  typeof value === "string" && value.length <= max && (optional || value.trim().length > 0) && !/[\u0000-\u001f\u007f]/.test(value);

export function validateContact(body: unknown): ContactInput | null {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const data = body as Record<string, unknown>;
  if (data._honey || data.consent !== "accepted") return null;
  if (!text(data.name, 120) || !text(data.institution ?? "", 200, true)) return null;
  if (typeof data.profile !== "string" || !["docente", "directivo", "otro"].includes(data.profile)) return null;
  const service = services.find(item => item.slug === data.service);
  if (!service || typeof data.contact_method !== "string" || !["email", "whatsapp"].includes(data.contact_method)) return null;
  const method = data.contact_method as ContactInput["method"];
  const contact = method === "email" ? data.email : data.phone;
  if (!text(contact, method === "email" ? 254 : 30)) return null;
  if (method === "email" && !/^[^\s@<>(),;:\\"]+@[^\s@<>(),;:\\"]+\.[^\s@<>(),;:\\"]+$/.test(contact.trim())) return null;
  if (method === "whatsapp" && (!/^\+?[0-9][0-9 ()-]*[0-9]$/.test(contact.trim()) || !/^\d{8,15}$/.test(contact.replace(/\D/g, "")))) return null;
  return {
    name: data.name.trim(), profile: data.profile as ContactInput["profile"],
    institution: String(data.institution ?? "").trim(), service: service.slug,
    method, contact: contact.trim(),
  };
}
