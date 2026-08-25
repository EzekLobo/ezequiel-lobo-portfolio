"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import type {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  TransitionEvent as ReactTransitionEvent,
  WheelEvent as ReactWheelEvent,
} from "react";
import type { Project } from "@/types";
import { ArrowUpRightIcon, ChevronLeftIcon, ChevronRightIcon } from "./Icons";

const SWIPE_THRESHOLD = 56;
const WHEEL_DEBOUNCE = 420;

type Direction = "previous" | "next";

type CarouselStyle = CSSProperties & {
  "--carousel-drag-offset": string;
};

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<Direction | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

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

  const move = useCallback(
    (nextDirection: Direction) => {
      if (!projects.length || isAnimating) return;

      setDirection(nextDirection);
      setDragOffset(0);
      setTransitionEnabled(true);
      setIsAnimating(true);
    },
    [isAnimating, projects.length],
  );

  const jumpTo = useCallback(
    (index: number) => {
      if (!projects.length || isAnimating || index === activeIndex) return;

      setActiveIndex(wrapIndex(index));
      setDirection(null);
      setDragOffset(0);
      setIsAnimating(false);
      setTransitionEnabled(false);

      requestAnimationFrame(() => setTransitionEnabled(true));
    },
    [activeIndex, isAnimating, projects.length, wrapIndex],
  );

  const handleTransitionEnd = (event: ReactTransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== "transform" || !direction || !isAnimating) return;

    setActiveIndex((index) => wrapIndex(index + (direction === "next" ? 1 : -1)));
    setDirection(null);
    setIsAnimating(false);
    setTransitionEnabled(false);

    requestAnimationFrame(() => setTransitionEnabled(true));
  };

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    if (event.ctrlKey || isDragging || !projects.length) return;

    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(delta) < 8) return;

    event.preventDefault();

    const now = performance.now();
    if (now - wheelLockRef.current < WHEEL_DEBOUNCE || isAnimating) return;

    wheelLockRef.current = now;
    move(delta > 0 ? "next" : "previous");
  };

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

  const visibleProjects = [
    { project: projects[wrapIndex(activeIndex - 1)], position: "previous" },
    { project: projects[activeIndex], position: "active" },
    { project: projects[wrapIndex(activeIndex + 1)], position: "next" },
  ] as const;

  const trackStyle: CarouselStyle = {
    "--carousel-drag-offset": `${dragOffset}px`,
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
        className={`project-carousel-viewport ${isDragging ? "is-dragging" : ""}`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onWheel={handleWheel}
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
          className={`carousel-track ${isAnimating ? `is-sliding-${direction}` : ""} ${transitionEnabled ? "" : "is-transition-disabled"}`}
          style={trackStyle}
          onTransitionEnd={handleTransitionEnd}
        >
          {visibleProjects.map(({ project, position }, index) => (
            <div
              key={`${project.title}-${position}-${activeIndex}`}
              className={`carousel-slide ${position === "active" ? "is-active" : "is-preview"}`}
              aria-hidden={position !== "active"}
            >
              <ProjectCard
                project={project}
                index={wrapIndex(activeIndex + index - 1)}
                interactive={position === "active"}
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
