"use client";

import { useEffect, useRef } from "react";
import { projects } from "@/content/portfolio";
import ProjectCarousel from "./ProjectCarousel";

export default function Projects() {
  const centeredInCurrentVisit = useRef(false);

  useEffect(() => {
    const section = document.getElementById("projetos");
    const focusTarget = document.getElementById("projetos-conteudo");
    if (!section || !focusTarget) return;

    const centerProjects = () => {
      focusTarget.scrollIntoView({ behavior: "smooth", block: "center" });
      centeredInCurrentVisit.current = true;
    };

    const handleHash = () => {
      if (window.location.hash === "#projetos") requestAnimationFrame(centerProjects);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      if (!entry.isIntersecting) {
        centeredInCurrentVisit.current = false;
        return;
      }

      if (!centeredInCurrentVisit.current) centerProjects();
    }, { rootMargin: "0px 0px -15% 0px", threshold: 0 });

    observer.observe(section);
    window.addEventListener("hashchange", handleHash);
    handleHash();
    return () => { observer.disconnect(); window.removeEventListener("hashchange", handleHash); };
  }, []);

  return (
    <section id="projetos" className="relative z-10 overflow-hidden border-t border-white/5 bg-black/20 py-24">
      <div className="relative z-20 mx-auto mb-8 max-w-7xl px-6 text-left">
        <h2 className="text-3xl font-bold">Meus <span className="text-brand-red">Projetos</span></h2>
        <div className="mt-4 h-1 w-12 rounded bg-brand-red" />
      </div>
      <div id="projetos-conteudo"><ProjectCarousel projects={projects} /></div>
    </section>
  );
}
