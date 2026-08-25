"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/portfolio";

const navItems = [
  { href: "#inicio", label: "/home" },
  { href: "#projetos", label: "/projetos" },
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

  return (
    <>
      <div className={`pointer-events-none fixed top-6 z-50 flex w-full justify-center px-4 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-24"}`}>
        <nav className="pointer-events-auto flex min-w-[300px] items-center justify-between gap-8 rounded-full border border-white/10 bg-white/5 px-6 py-3 shadow-2xl backdrop-blur-xl" aria-label="Navegação principal">
          <a href="#inicio" className="text-xl font-bold tracking-tighter text-white transition-colors hover:text-brand-red">EL<span className="text-brand-red">.</span></a>
          <ul className="hidden space-x-6 font-mono text-xs font-medium text-gray-400 md:flex">
            {navItems.map((item) => <li key={item.href}><a className="transition-colors hover:text-white" href={item.href}>{item.label}</a></li>)}
          </ul>
          <a href="#contato" className="hidden rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-brand-red md:block">Contato</a>
          <button type="button" onClick={() => setIsOpen(true)} className="text-white md:hidden" aria-label="Abrir menu de navegação" aria-expanded={isOpen}>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
        </nav>
      </div>
      <div className={`fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-brand-dark/95 backdrop-blur-xl transition-transform duration-300 md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`} aria-hidden={!isOpen}>
        <button type="button" onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-white/50" aria-label="Fechar menu"><svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 18 6M6 6l12 12" /></svg></button>
        {navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="text-2xl font-bold text-white hover:text-brand-red">{item.label.slice(1)}</a>)}
        <a href={`mailto:${profile.email}`} onClick={() => setIsOpen(false)} className="text-2xl font-bold text-white hover:text-brand-red">contato</a>
      </div>
    </>
  );
}
