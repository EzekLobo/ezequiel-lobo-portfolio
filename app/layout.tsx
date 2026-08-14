import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const title = "Ezequiel Lobo — Desenvolvedor de Software";
const description =
  "Portfólio de Ezequiel Lobo: projetos full stack, mobile e sistemas distribuídos com Python, Django, Next.js e TypeScript.";

export const metadata: Metadata = {
  metadataBase: new URL("https://projeto-portfolio-dinamico.vercel.app"),
  title,
  description,
  keywords: ["Ezequiel Lobo", "desenvolvedor backend", "desenvolvedor full stack", "Python", "Django", "Next.js", "TypeScript"],
  authors: [{ name: "Ezequiel Lobo" }],
  creator: "Ezequiel Lobo",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "pt_BR",
    url: "/",
    title,
    description,
    siteName: "Portfólio de Ezequiel Lobo",
    images: [{ url: "/profile/ezequiel.jpg", width: 460, height: 460, alt: "Ezequiel Lobo" }],
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
