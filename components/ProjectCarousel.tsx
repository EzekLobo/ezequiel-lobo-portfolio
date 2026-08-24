"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/types";
import { ArrowUpRightIcon, ChevronLeftIcon, ChevronRightIcon } from "./Icons";

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];

  return (
    <div className="project-carousel" aria-label="Carrossel de projetos" aria-roledescription="carrossel">
      <div className="carousel-toolbar">
        <p className="carousel-status" aria-live="polite">
          <strong>Projeto {String(activeIndex + 1).padStart(2, "0")}</strong>
          <span>/ {String(projects.length).padStart(2, "0")}</span>
        </p>
        <div className="carousel-controls">
          <button
            type="button"
            className="carousel-control"
            aria-label="Projeto anterior"
            onClick={() => setActiveIndex((index) => Math.max(index - 1, 0))}
            disabled={activeIndex === 0}
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            className="carousel-control"
            aria-label="Próximo projeto"
            onClick={() => setActiveIndex((index) => Math.min(index + 1, projects.length - 1))}
            disabled={activeIndex === projects.length - 1}
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      <div className="project-carousel-viewport">
        <ProjectCard project={activeProject} index={activeIndex} />
      </div>

      <div className="carousel-dots" role="tablist" aria-label="Selecionar projeto">
        {projects.map((project, index) => (
          <button
            key={project.title}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Ver projeto ${index + 1}: ${project.title}`}
            className={`carousel-dot ${index === activeIndex ? "is-active" : ""}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="project-card project-featured">
      <ProjectVisual project={project} index={index} />

      <div className="project-content">
        <p className="project-eyebrow">{project.eyebrow}</p>
        <h3>{project.title}</h3>
        <p className="project-summary">{project.summary}</p>

        <dl className="project-story">
          <div>
            <dt>Desafio</dt>
            <dd>{project.problem}</dd>
          </div>
          <div>
            <dt>Minha contribuição</dt>
            <dd>{project.contribution}</dd>
          </div>
        </dl>

        <ul className="project-evidence" aria-label={`Evidências do projeto ${project.title}`}>
          {project.evidence.map((item) => <li key={item}>{item}</li>)}
        </ul>

        <ul className="tech-list" aria-label={`Tecnologias do projeto ${project.title}`}>
          {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>

        <div className="project-links">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer">
              Ver demonstração <ArrowUpRightIcon />
            </a>
          )}
          <a href={project.repository} target="_blank" rel="noreferrer">
            Ver código <ArrowUpRightIcon />
          </a>
        </div>
      </div>
    </article>
  );
}

function ProjectVisual({ project, index }: { project: Project; index: number }) {
  if (project.title === "AulaPay") {
    return (
      <div className="project-visual app-visual" aria-label="Representação da interface do aplicativo AulaPay">
        <div className="phone-mockup" aria-hidden="true">
          <div className="phone-top"><span>AulaPay</span><i /></div>
          <p>Resumo do mês</p>
          <strong>R$ 2.480,00</strong>
          <div className="phone-stats"><span>12 aulas</span><span>3 turmas</span></div>
          <div className="phone-bars"><i /><i /><i /><i /><i /><i /></div>
          <div className="phone-payment"><span>Próximo pagamento</span><strong>15 ago</strong></div>
        </div>
        <span className="visual-number">0{index + 1}</span>
      </div>
    );
  }

  if (project.visual === "go-board") {
    return (
      <div className="project-visual go-visual" aria-label="Representação de um tabuleiro de Go">
        <div className="go-board" aria-hidden="true">
          {Array.from({ length: 9 }, (_, item) => <span key={item} />)}
          <i className="stone stone-dark stone-one" />
          <i className="stone stone-light stone-two" />
          <i className="stone stone-dark stone-three" />
          <i className="stone stone-light stone-four" />
          <i className="stone stone-dark stone-five" />
        </div>
        <span className="visual-number">0{index + 1}</span>
      </div>
    );
  }

  return (
    <div className="project-visual dashboard-visual">
      {project.image && (
        <Image
          src={project.image}
          alt={project.imageAlt ?? ""}
          fill
          sizes="(max-width: 900px) 100vw, 48vw"
          className="project-image"
        />
      )}
      <span className="visual-number">0{index + 1}</span>
    </div>
  );
}
