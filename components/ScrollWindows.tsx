"use client";

import { useEffect } from "react";

export default function ScrollWindows() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-window]"));
    const centeredSections = new Set<HTMLElement>();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const focusSection = (section: HTMLElement, behavior: ScrollBehavior = reducedMotion ? "auto" : "smooth") => {
      const focusTarget = section.querySelector<HTMLElement>("[data-scroll-focus]") ?? section;
      const targetRect = focusTarget.getBoundingClientRect();
      const targetTop = window.scrollY + targetRect.top + targetRect.height / 2 - window.innerHeight / 2;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: Math.max(0, Math.min(targetTop, maxScroll)), behavior });
      centeredSections.add(section);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const section = entry.target as HTMLElement;
        if (!entry.isIntersecting) {
          centeredSections.delete(section);
          return;
        }
        if (!centeredSections.has(section)) focusSection(section);
      });
    }, { rootMargin: "0px 0px -15% 0px", threshold: 0 });

    sections.forEach((section) => observer.observe(section));

    const focusHashTarget = () => {
      if (!window.location.hash) return;
      const target = document.querySelector<HTMLElement>(window.location.hash);
      if (target?.matches("[data-scroll-window]")) requestAnimationFrame(() => focusSection(target));
    };

    window.addEventListener("hashchange", focusHashTarget);
    focusHashTarget();
    return () => { observer.disconnect(); window.removeEventListener("hashchange", focusHashTarget); };
  }, []);

  return null;
}
