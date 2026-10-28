import type { Metadata } from "next";
import "./globals.css";
const title = "EduKole | Crea sesiones de aprendizaje con IA";
const description =
  "Crea sesiones de aprendizaje con apoyo de IA. Conoce EduKole en una demo para docentes y colegios.";
export const metadata: Metadata = {
  metadataBase: new URL("https://edukolea.com/"),
  title,
  description,
  alternates: { canonical: "https://edukolea.com/" },
  robots: { index: true, follow: true },
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
      <body>{children}</body>
    </html>
  );
}
