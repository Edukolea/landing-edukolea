import type { Metadata } from "next";
import "./globals.css";
import { AnalyticsConsent } from "./components/analytics-consent";
import { siteTitle as title, siteDescription as description, siteUrl } from "./lib/seo";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "EduKole",
  title,
  description,
  alternates: { canonical: "https://edukolea.com/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: {
    type: "website",
    locale: "es",
    siteName: "EduKole",
    url: "https://edukolea.com/",
    title,
    description,
    images: [
      {
        url: "/og-edukole.png",
        width: 1200,
        height: 630,
        alt: "EduKole. Crea sesiones de aprendizaje con apoyo de IA.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-edukole.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/brand-icon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/apple-touch-icon.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        {children}
        <AnalyticsConsent gaId={process.env.NEXT_PUBLIC_GA_ID} />
      </body>
    </html>
  );
}
