"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/types";
import { ExternalLinkIcon, GitHubIcon } from "./Icons";

const WHEEL_DEBOUNCE = 240;

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

  const setViewport = useCallback(
    (node: HTMLDivElement | null) => {
      viewportRef.current = node;
      emblaRef(node);
    },
    [emblaRef],
  );

  const previous = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi || projects.length === 0) return;

    const update = () => {
      const snap = emblaApi.selectedScrollSnap();
      setActiveIndex(snap % projects.length);
    };

    emblaApi.scrollTo(0, true);
    update();
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);

    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi, projects.length]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !emblaApi) return;

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;

      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (Math.abs(delta) < 8) return;

      event.preventDefault();

      const now = performance.now();
      if (now - wheelLockRef.current < WHEEL_DEBOUNCE) return;

      wheelLockRef.current = now;
      if (delta > 0) next();
      else previous();
    };

    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", onWheel);
  }, [emblaApi, next, previous]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      previous();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }
  };

  if (!projects.length) return null;

  return (
    <div className="relative w-full select-none" role="region" aria-label="Carrossel de projetos" aria-roledescription="carrossel">
      <div className="relative pt-4 pb-8">
        <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-32 bg-gradient-to-r from-brand-dark via-brand-dark/85 to-transparent" />
        <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-32 bg-gradient-to-l from-brand-dark via-brand-dark/85 to-transparent" />

        <button
          type="button"
          className="carousel-control absolute top-[40%] left-4 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-2xl text-white shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:bg-brand-red md:left-6 md:h-12 md:w-12"
          aria-label="Projeto anterior"
          onClick={previous}
        >
          ‹
        </button>

        <div ref={setViewport} tabIndex={0} onKeyDown={onKeyDown} className="project-carousel-viewport cursor-grab overflow-hidden py-8 active:cursor-grabbing">
          <div className="flex items-center gap-8 px-[15vw] md:px-[25vw]">
            {projects.map((project, index) => {
              const active = index === activeIndex;

              return (
                <div key={`${project.repository ?? project.title}-${index}`} className="w-[75vw] shrink-0 md:w-96" aria-hidden={!active}>
                  <div className={`carousel-slide-inner ${active ? "is-active" : ""}`}>
                    <ProjectCard project={project} active={active} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          className="carousel-control absolute top-[40%] right-4 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-2xl text-white shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:bg-brand-red md:right-6 md:h-12 md:w-12"
          aria-label="Próximo projeto"
          onClick={next}
        >
          ›
        </button>
      </div>

      <div className="flex justify-center gap-2 pb-4" role="tablist" aria-label="Selecionar projeto">
        {projects.map((project, index) => (
          <button
            key={project.repository ?? project.title}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Ver projeto ${index + 1}: ${project.title}`}
            className={`carousel-dot h-1 rounded-full transition-all ${index === activeIndex ? "w-12 bg-brand-red" : "w-6 bg-white/20 hover:bg-white/40"}`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, active }: { project: Project; active: boolean }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const pointerStart = useRef({ x: 0, y: 0 });
  const pointerMoved = useRef(false);
  const flipped = active && isFlipped;

  const toggleFlip = () => {
    if (active && !pointerMoved.current) setIsFlipped((current) => !current);
  };

  return (
    <article
      className="legacy-project-card"
      tabIndex={active ? 0 : -1}
      aria-label={`${project.title}. ${flipped ? "Verso" : "Frente"} do card`}
      onMouseEnter={() => active && setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onPointerDown={(event) => {
        pointerStart.current = { x: event.clientX, y: event.clientY };
        pointerMoved.current = false;
      }}
      onPointerMove={(event) => {
        const distance = Math.hypot(event.clientX - pointerStart.current.x, event.clientY - pointerStart.current.y);
        if (distance > 6) pointerMoved.current = true;
      }}
      onClick={toggleFlip}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleFlip();
        }
      }}
    >
      <div className={`legacy-project-card__inner ${flipped ? "is-flipped" : ""}`}>
        <div aria-hidden={flipped} className="legacy-project-card__face legacy-project-card__face--front">
          <div className="relative h-52 bg-gray-900">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.imageAlt ?? project.title}
                fill
                sizes="(max-width: 768px) 75vw, 384px"
                className="object-cover"
                draggable={false}
              />
            ) : (
              <div className="grid h-full place-items-center bg-gradient-to-br from-brand-card to-black px-6 text-center font-mono text-xs tracking-[0.18em] text-gray-500 uppercase">
                {project.title}
              </div>
            )}
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm text-gray-400">{project.summary}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span key={technology} className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[10px] text-red-400 md:text-xs">
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div aria-hidden={!flipped} className="legacy-project-card__face legacy-project-card__face--back">
          <div>
            <p className="mb-4 font-mono text-xs tracking-[0.16em] text-red-500 uppercase">Sobre o projeto</p>
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-200">{project.summary}</p>
          </div>

          <div className="flex w-full flex-col gap-3">
            {project.repository && (
              <a
                href={project.repository}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-link inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-bold text-white transition-colors hover:bg-red-700"
                tabIndex={active ? undefined : -1}
                onClick={(event) => event.stopPropagation()}
                onPointerDown={(event) => event.stopPropagation()}
              >
                <GitHubIcon className="h-4 w-4" />
                Acessar repositório
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-link inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
                tabIndex={active ? undefined : -1}
                onClick={(event) => event.stopPropagation()}
                onPointerDown={(event) => event.stopPropagation()}
              >
                <ExternalLinkIcon className="h-4 w-4" />
                Ver demonstração
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
