"use client";

import { useEffect, useRef, useState } from "react";

const navItems = [
  { href: "#inicio", label: "Início" },
  { href: "#projetos", label: "Projetos" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentY = window.scrollY;
      setIsVisible(currentY < 100 || currentY <= lastScrollY.current);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", controlNavbar, { passive: true });
    return () => window.removeEventListener("scroll", controlNavbar);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const focusWindow = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute("href");
    if (!href?.startsWith("#")) return;
    const section = document.querySelector<HTMLElement>(href);
    if (!section?.matches("[data-scroll-window]")) return;

    event.preventDefault();
    const target = section.querySelector<HTMLElement>("[data-scroll-focus]") ?? section;
    const targetRect = target.getBoundingClientRect();
    const targetTop = window.scrollY + targetRect.top + targetRect.height / 2 - window.innerHeight / 2;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: Math.max(0, Math.min(targetTop, maxScroll)), behavior: reducedMotion ? "auto" : "smooth" });
    window.history.pushState(null, "", href);
    setIsOpen(false);
  };

  return (
    <>
      <div className={`pointer-events-none fixed top-0 z-50 flex w-full justify-center px-6 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-24"}`}>
        <nav className="pointer-events-auto flex h-20 w-full max-w-7xl items-center justify-end md:grid md:grid-cols-[1fr_auto_1fr]" aria-label="Navegação principal">
          <ul className="hidden items-center gap-8 font-mono text-[11px] font-medium tracking-[0.16em] text-gray-500 uppercase md:col-start-2 md:flex">
            {navItems.map((item) => <li key={item.href}><a className="border-b border-transparent pb-1 transition-all hover:border-brand-red hover:text-white" href={item.href} onClick={focusWindow}>{item.label}</a></li>)}
          </ul>
          <a href="#contato" onClick={focusWindow} className="hidden justify-self-end border-b border-brand-red pb-1 font-mono text-[11px] font-bold tracking-[0.16em] text-white uppercase transition-colors hover:text-brand-red md:block">Contato</a>
          <button type="button" onClick={() => setIsOpen(true)} className="flex h-9 w-9 items-center justify-center border border-white/15 text-white transition-colors hover:border-brand-red hover:text-brand-red md:hidden" aria-label="Abrir menu de navegação" aria-expanded={isOpen}>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
        </nav>
      </div>
      <div className={`fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-brand-dark/95 backdrop-blur-xl transition-transform duration-300 md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`} aria-hidden={!isOpen}>
        <button type="button" onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-white/50" aria-label="Fechar menu"><svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 18 6M6 6l12 12" /></svg></button>
        {navItems.map((item) => <a key={item.href} href={item.href} onClick={focusWindow} className="text-2xl font-bold text-white hover:text-brand-red">{item.label}</a>)}
        <a href="#contato" onClick={focusWindow} className="text-2xl font-bold text-white hover:text-brand-red">contato</a>
      </div>
    </>
  );
}
