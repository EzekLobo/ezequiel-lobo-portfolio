import type { Metadata, Viewport } from "next";
import { profile, siteUrl } from "@/content/portfolio";
import "./globals.css";

const title = "Ezequiel Lobo Oliveira | Analista de Sistemas";
const description =
  "Portfólio de Ezequiel Lobo Oliveira, Analista de Sistemas com experiência em .NET, Angular, APIs REST, testes e regras de negócio.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: ["Ezequiel Lobo Oliveira", "analista de sistemas", "desenvolvedor full stack", "C#", "ASP.NET Core", "Angular", "TypeScript"],
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "pt_BR",
    url: "/",
    title,
    description,
    siteName: `Portfólio de ${profile.name}`,
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
