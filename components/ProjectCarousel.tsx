"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  TransitionEvent as ReactTransitionEvent,
} from "react";
import type { Project } from "@/types";
import { ArrowUpRightIcon, ChevronLeftIcon, ChevronRightIcon } from "./Icons";

const SWIPE_THRESHOLD = 56;
const WHEEL_DEBOUNCE = 420;

type Direction = "previous" | "next";

type CarouselStyle = CSSProperties & {
  transform: string;
};

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [virtualIndex, setVirtualIndex] = useState(() => projects.length);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [slideStep, setSlideStep] = useState(0);

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({
    pointerId: -1,
    startX: 0,
    currentX: 0,
    moved: false,
  });
  const wheelLockRef = useRef(0);
  const suppressClickRef = useRef(false);

  const wrapIndex = useCallback(
    (index: number) => (index + projects.length) % projects.length,
    [projects.length],
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const updateStep = () => {
      const slide = track.querySelector<HTMLElement>(".carousel-slide");
      if (!slide) return;

      const gap = Number.parseFloat(getComputedStyle(track).gap) || 0;
      setSlideStep(slide.offsetWidth + gap);
    };

    updateStep();
    const observer = new ResizeObserver(updateStep);
    observer.observe(viewport);

    return () => observer.disconnect();
  }, [projects.length]);

  const move = useCallback(
    (nextDirection: Direction) => {
      if (!projects.length || isAnimating || !slideStep) return;

      setDragOffset(0);
      setTransitionEnabled(true);
      setIsAnimating(true);
      setVirtualIndex((index) => index + (nextDirection === "next" ? 1 : -1));
    },
    [isAnimating, projects.length, slideStep],
  );

  const jumpTo = useCallback(
    (index: number) => {
      if (!projects.length || isAnimating || wrapIndex(virtualIndex) === index) return;

      setDragOffset(0);
      setIsAnimating(false);
      setTransitionEnabled(false);
      setVirtualIndex(projects.length + wrapIndex(index));

      requestAnimationFrame(() => setTransitionEnabled(true));
    },
    [isAnimating, projects.length, virtualIndex, wrapIndex],
  );

  const handleTransitionEnd = (event: ReactTransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== "transform" || !isAnimating) return;

    setIsAnimating(false);

    if (virtualIndex === projects.length - 1) {
      setTransitionEnabled(false);
      setVirtualIndex(projects.length * 2 - 1);
      requestAnimationFrame(() => setTransitionEnabled(true));
    } else if (virtualIndex === projects.length * 2) {
      setTransitionEnabled(false);
      setVirtualIndex(projects.length);
      requestAnimationFrame(() => setTransitionEnabled(true));
    }
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || isDragging || !projects.length) return;

      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (Math.abs(delta) < 8) return;

      event.preventDefault();

      const now = performance.now();
      if (now - wheelLockRef.current < WHEEL_DEBOUNCE || isAnimating) return;

      wheelLockRef.current = now;
      move(delta > 0 ? "next" : "previous");
    };

    viewport.addEventListener("wheel", handleWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", handleWheel);
  }, [isAnimating, isDragging, move, projects.length]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || isAnimating) return;

    const target = event.target as Element;
    if (target.closest("a, button")) return;

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      currentX: event.clientX,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    setTransitionEnabled(false);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!isDragging || drag.pointerId !== event.pointerId) return;

    const offset = event.clientX - drag.startX;
    drag.currentX = event.clientX;
    drag.moved = Math.abs(offset) > 8;

    if (drag.moved) {
      event.preventDefault();
      setDragOffset(offset);
    }
  };

  const finishPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!isDragging || drag.pointerId !== event.pointerId) return;

    const offset = drag.currentX - drag.startX;
    const shouldMove = Math.abs(offset) >= SWIPE_THRESHOLD;
    const nextDirection: Direction = offset < 0 ? "next" : "previous";

    suppressClickRef.current = drag.moved;
    dragRef.current.pointerId = -1;
    setIsDragging(false);
    setDragOffset(0);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (shouldMove) {
      move(nextDirection);
    } else {
      setTransitionEnabled(true);
    }
  };

  const handleClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!suppressClickRef.current) return;

    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || isAnimating) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move("previous");
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      move("next");
    } else if (event.key === "Home") {
      event.preventDefault();
      jumpTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      jumpTo(projects.length - 1);
    }
  };

  if (!projects.length) return null;

  const activeIndex = wrapIndex(virtualIndex);
  const repeatedProjects = [...projects, ...projects, ...projects];

  const trackStyle: CarouselStyle = {
    transform: `translate3d(${-(virtualIndex * slideStep) + dragOffset}px, 0, 0)`,
  };

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
        ref={viewportRef}
        className={`project-carousel-viewport ${isDragging ? "is-dragging" : ""}`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointer}
        onPointerCancel={finishPointer}
        onClickCapture={handleClickCapture}
      >
        <button
          type="button"
          className="carousel-control carousel-control-prev"
          aria-label="Projeto anterior"
          onClick={() => move("previous")}
        >
          <ChevronLeftIcon />
        </button>

        <div
          ref={trackRef}
          className={`carousel-track ${transitionEnabled ? "" : "is-transition-disabled"}`}
          style={trackStyle}
          onTransitionEnd={handleTransitionEnd}
        >
          {repeatedProjects.map((project, index) => (
            <div
              key={`${project.title}-${index}`}
              className={`carousel-slide ${index === virtualIndex ? "is-active" : "is-preview"}`}
              aria-hidden={index !== virtualIndex}
            >
              <ProjectCard
                project={project}
                index={wrapIndex(index)}
                interactive={index === virtualIndex}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="carousel-control carousel-control-next"
          aria-label="Próximo projeto"
          onClick={() => move("next")}
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
            onClick={() => jumpTo(index)}
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
