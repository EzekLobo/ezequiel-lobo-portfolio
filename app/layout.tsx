import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "Ezequiel Lobo Oliveira — Analista de Sistemas";
const description =
  "Portfólio de Ezequiel Lobo Oliveira: analista de sistemas com experiência em desenvolvimento full stack, qualidade de software e regras de negócio.";

export const metadata: Metadata = {
  metadataBase: new URL("https://projeto-portfolio-dinamico.vercel.app"),
  title,
  description,
  keywords: ["Ezequiel Lobo Oliveira", "analista de sistemas", "desenvolvedor full stack", "C#", "ASP.NET Core", "Angular", "TypeScript"],
  authors: [{ name: "Ezequiel Lobo Oliveira" }],
  creator: "Ezequiel Lobo Oliveira",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "pt_BR",
    url: "/",
    title,
    description,
    siteName: "Portfólio de Ezequiel Lobo Oliveira",
    images: [{ url: "/profile/ezequiel.jpg", width: 460, height: 460, alt: "Ezequiel Lobo Oliveira" }],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/profile/ezequiel.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0c0f",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
