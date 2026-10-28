export const contactEmail = "contacto@edukolea.com";
export const demoFormAction = "/api/contacto/";
export const contacts = { email: `mailto:${contactEmail}`, whatsapp: "https://wa.me/51906815008" };
export const services = [
  { slug: "aula_lista_ia", name: "AulaLista IA", title: "Empieza por la sesión de aprendizaje", description: "Crea sesiones de aprendizaje con apoyo de inteligencia artificial y adapta cada propuesta a las necesidades de tu aula.", status: "Disponible para demo" },
  { slug: "kolea_en_pares", name: "Kolea en Pares", title: "Aprender también es compartir", description: "Desarrollo de sesiones de aprendizaje entre pares, con agentes que pueden actuar como tutores.", status: "Alcance y disponibilidad por confirmar" },
  { slug: "kolea_reporta", name: "Kolea Reporta", title: "Una mirada a los reportes educativos", description: "Reportes estandarizados y apoyo para tareas relacionadas con SIAGIE mediante IA. La relación técnica con SIAGIE está por definir; no se ofrece integración.", status: "Alcance y disponibilidad por confirmar" },
] as const;
export type ServiceSlug = typeof services[number]["slug"];
