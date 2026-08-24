import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import { profile } from "@/content/portfolio";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Analista de Sistemas",
    url: "https://projeto-portfolio-dinamico.vercel.app",
    image: "https://projeto-portfolio-dinamico.vercel.app/profile/ezequiel.jpg",
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ilhéus",
      addressRegion: "BA",
      addressCountry: "BR",
    },
    sameAs: [profile.github, profile.linkedin],
    knowsAbout: ["C#", "ASP.NET Core", "SQL Server", "Angular", "TypeScript", "APIs REST", "Testes de software"],
  };

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Navbar />
      <main id="conteudo">
        <Hero />
        <Projects />
        <Skills />
        <Experience />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
