"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/types";
import { ArrowUpRightIcon, ChevronLeftIcon, ChevronRightIcon } from "./Icons";

const WHEEL_DEBOUNCE = 420;

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    duration: 32,
    loop: true,
    skipSnaps: false,
  });
  const [activeIndex, setActiveIndex] = useState(0);

  const viewportRef = useRef<HTMLDivElement>(null);
  const wheelLockRef = useRef(0);

  const setViewport = useCallback((node: HTMLDivElement | null) => {
    viewportRef.current = node;
    emblaRef(node);
  }, [emblaRef]);

  const scrollPrevious = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const updateActiveIndex = () => setActiveIndex(emblaApi.selectedScrollSnap());
    updateActiveIndex();
    emblaApi.on("select", updateActiveIndex);
    emblaApi.on("reInit", updateActiveIndex);

    return () => {
      emblaApi.off("select", updateActiveIndex);
      emblaApi.off("reInit", updateActiveIndex);
    };
  }, [emblaApi]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || !projects.length || !emblaApi) return;

      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (Math.abs(delta) < 8) return;

      event.preventDefault();

      const now = performance.now();
      if (now - wheelLockRef.current < WHEEL_DEBOUNCE) return;

      wheelLockRef.current = now;
      if (delta > 0) scrollNext();
      else scrollPrevious();
    };

    viewport.addEventListener("wheel", handleWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", handleWheel);
  }, [emblaApi, projects.length, scrollNext, scrollPrevious]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollPrevious();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollNext();
    } else if (event.key === "Home") {
      event.preventDefault();
      scrollTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      scrollTo(projects.length - 1);
    }
  };

  if (!projects.length) return null;

  return (
    <div
      className="project-carousel"
      role="region"
      aria-label="Carrossel de projetos"
      aria-roledescription="carrossel"
    >
      <div className="carousel-toolbar">
        <p className="carousel-status" aria-live="polite">
          <strong>Projeto {String(activeIndex + 1).padStart(2, "0")}</strong>
          <span> / {String(projects.length).padStart(2, "0")} · {projects[activeIndex].title}</span>
        </p>
        <span className="carousel-hint">Arraste ou use a roda do mouse</span>
      </div>

      <div
        ref={setViewport}
        className="project-carousel-viewport"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <button
          type="button"
          className="carousel-control carousel-control-prev"
          aria-label="Projeto anterior"
          onClick={scrollPrevious}
        >
          <ChevronLeftIcon />
        </button>

        <div
          className="carousel-track"
        >
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`carousel-slide ${index === activeIndex ? "is-active" : "is-preview"}`}
              aria-hidden={index !== activeIndex}
            >
              <div className="carousel-slide-inner">
                <ProjectCard project={project} index={index} interactive={index === activeIndex} />
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="carousel-control carousel-control-next"
          aria-label="Próximo projeto"
          onClick={scrollNext}
        >
          <ChevronRightIcon />
        </button>
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
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, index, interactive }: { project: Project; index: number; interactive: boolean }) {
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
            <a href={project.demo} target="_blank" rel="noreferrer" tabIndex={interactive ? undefined : -1}>
              Ver demonstração <ArrowUpRightIcon />
            </a>
          )}
          <a href={project.repository} target="_blank" rel="noreferrer" tabIndex={interactive ? undefined : -1}>
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
