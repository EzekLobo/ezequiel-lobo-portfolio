"use client";

import { useEffect } from "react";

export default function ScrollWindows() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-window]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let centeredSection: HTMLElement | null = null;
    let isCentering = false;
    let settleTimer: number | undefined;

    const focusSection = (section: HTMLElement, behavior: ScrollBehavior = reducedMotion ? "auto" : "smooth") => {
      const focusTarget = section.querySelector<HTMLElement>("[data-scroll-focus]") ?? section;
      const targetRect = focusTarget.getBoundingClientRect();
      const targetTop = window.scrollY + targetRect.top + targetRect.height / 2 - window.innerHeight / 2;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      isCentering = true;
      centeredSection = section;
      window.scrollTo({ top: Math.max(0, Math.min(targetTop, maxScroll)), behavior });

      if (behavior === "auto") window.requestAnimationFrame(() => { isCentering = false; });
    };

    const centerNearestWindow = () => {
      if (isCentering) return;

      const viewportCenter = window.innerHeight / 2;
      const nearestSection = sections.reduce<HTMLElement | null>((nearest, section) => {
        const sectionRect = section.getBoundingClientRect();
        const sectionCenter = sectionRect.top + sectionRect.height / 2;
        if (!nearest) return section;

        const nearestRect = nearest.getBoundingClientRect();
        const nearestCenter = nearestRect.top + nearestRect.height / 2;
        return Math.abs(sectionCenter - viewportCenter) < Math.abs(nearestCenter - viewportCenter) ? section : nearest;
      }, null);

      if (!nearestSection || nearestSection === centeredSection) return;

      const nearestRect = nearestSection.getBoundingClientRect();
      const distanceFromViewport = Math.abs(nearestRect.top + nearestRect.height / 2 - viewportCenter);
      if (distanceFromViewport < window.innerHeight * 0.7) focusSection(nearestSection);
    };

    const scheduleCentering = () => {
      if (isCentering) return;
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(centerNearestWindow, 140);
    };

    const handleScrollEnd = () => {
      if (isCentering) {
        isCentering = false;
        return;
      }
      centerNearestWindow();
    };

    const focusHashTarget = () => {
      if (!window.location.hash) return;
      const target = document.querySelector<HTMLElement>(window.location.hash);
      if (target?.matches("[data-scroll-window]")) window.requestAnimationFrame(() => focusSection(target));
    };

    window.addEventListener("scroll", scheduleCentering, { passive: true });
    window.addEventListener("scrollend", handleScrollEnd);
    window.addEventListener("hashchange", focusHashTarget);
    focusHashTarget();

    return () => {
      window.clearTimeout(settleTimer);
      window.removeEventListener("scroll", scheduleCentering);
      window.removeEventListener("scrollend", handleScrollEnd);
      window.removeEventListener("hashchange", focusHashTarget);
    };
  }, []);

  return null;
}
