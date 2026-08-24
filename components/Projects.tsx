import { projects } from "@/content/portfolio";
import ProjectCarousel from "./ProjectCarousel";

export default function Projects() {
  return (
    <section id="projetos" className="projects section-shell content-section">
      <div className="section-heading section-heading-split">
        <div>
          <p className="section-kicker">01 · Projetos selecionados</p>
          <h2>Projetos com contexto, código e evidências.</h2>
        </div>
        <p>
          Uma seleção de aplicações web, mobile e distribuídas com repositórios
          públicos e decisões técnicas descritas com clareza.
        </p>
      </div>

      <div className="project-grid">
        <ProjectCarousel projects={projects} />
      </div>
    </section>
  );
}
