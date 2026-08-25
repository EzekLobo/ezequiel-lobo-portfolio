import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import { profile, siteUrl } from "@/content/portfolio";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Analista de Sistemas",
    url: siteUrl,
    image: `${siteUrl}/profile/ezequiel.jpg`,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    address: { "@type": "PostalAddress", addressLocality: "Ilhéus", addressRegion: "BA", addressCountry: "BR" },
    sameAs: [profile.github, profile.linkedin],
    knowsAbout: ["C#", "ASP.NET Core", "SQL Server", "Angular", "TypeScript", "APIs REST", "Testes de software"],
  };

  return (
    <main className="relative flex min-h-screen flex-col overflow-x-hidden bg-brand-dark text-white">
      <div className="pointer-events-none fixed inset-0 z-0 bg-grid-pattern bg-[size:40px_40px]" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-transparent via-brand-dark/80 to-brand-dark" />
      <Navbar />
      <div className="relative z-10 flex-grow">
        <Hero />
        <Projects />
      </div>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </main>
  );
}
