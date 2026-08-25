"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/types";
import { ExternalLinkIcon, GitHubIcon } from "./Icons";

const WHEEL_DEBOUNCE = 240;

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "center", duration: 32, loop: true, skipSnaps: false });
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSnap, setSelectedSnap] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const wheelLockRef = useRef(0);
  const loopedProjects = [...projects, ...projects, ...projects];

  const setViewport = useCallback((node: HTMLDivElement | null) => { viewportRef.current = node; emblaRef(node); }, [emblaRef]);
  const previous = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      const snap = emblaApi.selectedScrollSnap();
      setSelectedSnap(snap);
      setActiveIndex(snap % projects.length);
    };

    emblaApi.scrollTo(projects.length, true);
    update();
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    return () => { emblaApi.off("select", update); emblaApi.off("reInit", update); };
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
    if (event.key === "ArrowLeft") { event.preventDefault(); previous(); }
    if (event.key === "ArrowRight") { event.preventDefault(); next(); }
  };

  if (!projects.length) return null;

  return (
    <div className="relative w-full select-none" role="region" aria-label="Carrossel de projetos" aria-roledescription="carrossel">
      <div className="relative">
        <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-32 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-transparent" />
        <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-32 bg-gradient-to-l from-brand-dark via-brand-dark/80 to-transparent" />
        <button type="button" className="carousel-control absolute top-1/2 left-4 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-3xl text-white shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:bg-brand-red md:left-6" aria-label="Projeto anterior" onClick={previous}>‹</button>
        <div ref={setViewport} tabIndex={0} onKeyDown={onKeyDown} className="project-carousel-viewport cursor-grab overflow-hidden py-8 active:cursor-grabbing">
          <div className="flex gap-8 px-[8vw] md:px-[calc(50%_-_430px)]">
            {loopedProjects.map((project, index) => (
              <div key={`${project.title}-${index}`} className="w-[84vw] shrink-0 md:w-[860px]" aria-hidden={index !== selectedSnap}>
                <div className={`carousel-slide-inner ${index === selectedSnap ? "is-active" : ""}`}><ProjectCard project={project} active={index === selectedSnap} /></div>
              </div>
            ))}
          </div>
        </div>
        <button type="button" className="carousel-control absolute top-1/2 right-4 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-3xl text-white shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:bg-brand-red md:right-6" aria-label="Próximo projeto" onClick={next}>›</button>
      </div>
      <div className="flex justify-center gap-2 pb-4" role="tablist" aria-label="Selecionar projeto">
        {projects.map((project, index) => <button key={project.title} type="button" role="tab" aria-selected={index === activeIndex} aria-label={`Ver projeto ${index + 1}: ${project.title}`} className={`carousel-dot h-1 rounded-full transition-all ${index === activeIndex ? "w-12 bg-brand-red" : "w-6 bg-white/20 hover:bg-white/40"}`} onClick={() => scrollTo(index + projects.length)} />)}
      </div>
    </div>
  );
}

function ProjectCard({ project, active }: { project: Project; active: boolean }) {
  return (
    <article data-project-card className="overflow-hidden rounded-3xl border border-white/10 bg-brand-card shadow-xl md:grid md:h-[610px] md:grid-cols-[minmax(290px,.78fr)_minmax(0,1.22fr)]">
      <ProjectVisual project={project} />
      <div data-project-content className="flex flex-col p-6 md:p-7">
        <header>
          <p className="font-mono text-[10px] tracking-wider text-brand-red uppercase">{project.eyebrow}</p>
          <h3 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">{project.title}</h3>
          <p className="mt-3 text-sm leading-5 text-gray-300">{project.summary}</p>
        </header>

        <dl className="mt-5 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-3"><dt className="font-mono text-[11px] tracking-wider text-brand-red uppercase">Desafio</dt><dd className="mt-1.5 text-[12px] leading-[1.45] text-gray-200">{project.problem}</dd></div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-3"><dt className="font-mono text-[11px] tracking-wider text-brand-red uppercase">Minha contribuição</dt><dd className="mt-1.5 text-[12px] leading-[1.45] text-gray-200">{project.contribution}</dd></div>
        </dl>

        <section className="mt-4" aria-label={`Evidências de ${project.title}`}>
          <p className="font-mono text-[11px] tracking-wider text-brand-red uppercase">Evidências técnicas</p>
          <ul className="mt-2.5 grid gap-1.5">{project.evidence.map((item, index) => <li key={item} className="flex items-start gap-3 border-l-2 border-brand-red/60 pl-3 text-[12px] leading-4 text-gray-200"><span aria-hidden="true" className="font-mono text-[10px] text-brand-red">0{index + 1}</span><span>{item}</span></li>)}</ul>
        </section>

        <div className="mt-auto border-t border-white/10 pt-4">
          <p className="font-mono text-[11px] tracking-wider text-gray-500 uppercase">Tecnologias</p>
          <div className="mt-2.5 flex flex-wrap gap-2">{project.technologies.map((tech) => <span key={tech} className="rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-[11px] text-red-200">{tech}</span>)}</div>
          <div className="mt-4 flex flex-wrap gap-3"><a className="project-card-link inline-flex items-center gap-2 rounded-lg border border-brand-red/30 bg-brand-red/10 px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-red/20" href={project.repository} target="_blank" rel="noreferrer" tabIndex={active ? undefined : -1}><GitHubIcon className="h-4 w-4" />Ver código</a>{project.demo && <a className="project-card-link inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-white/10" href={project.demo} target="_blank" rel="noreferrer" tabIndex={active ? undefined : -1}><ExternalLinkIcon className="h-4 w-4" />Ver demonstração</a>}</div>
        </div>
      </div>
    </article>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  if (!project.image) return null;
  return <div className="relative h-52 overflow-hidden bg-gray-900 md:h-full"><Image src={project.image} alt={project.imageAlt ?? project.title} fill sizes="(max-width: 768px) 84vw, 390px" className="object-cover" draggable={false} /></div>;
}
