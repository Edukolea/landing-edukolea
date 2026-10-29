import { contactEmail } from "./content";

export const siteUrl = "https://edukolea.com/";
export const siteTitle = "AulaLista IA | Sesiones de aprendizaje con IA · EduKole";
export const siteDescription =
  "Crea sesiones de aprendizaje con inteligencia artificial y adáptalas a tu aula. Conoce AulaLista IA de EduKole y solicita una demo para docentes y colegios.";

// Only verified information also presented on the landing page.
export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}#organization`,
      name: "EduKole",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}brand-icon.png`, width: 192, height: 192 },
      email: contactEmail,
      description: "Propuestas educativas con tecnología e inteligencia artificial para docentes y colegios.",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
      url: siteUrl,
      name: "EduKole",
      inLanguage: "es",
      publisher: { "@id": `${siteUrl}#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}#webpage`,
      url: siteUrl,
      name: siteTitle,
      description: siteDescription,
      inLanguage: "es",
      isPartOf: { "@id": `${siteUrl}#website` },
      about: { "@id": `${siteUrl}#organization` },
    },
  ],
};
