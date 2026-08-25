"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/portfolio";

const navItems = [
  { href: "#projetos", label: "Projetos" },
  { href: "#competencias", label: "Competências" },
  { href: "#trajetoria", label: "Trajetória" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const shouldShow = currentScrollY < 96 || currentScrollY <= lastScrollY.current;

      setIsVisible(shouldShow);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isMenuOpen);

    return () => document.body.classList.remove("menu-open");
  }, [isMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <div className={`nav-wrap${isVisible ? "" : " is-hidden"}`}>
        <nav className="navbar section-shell" aria-label="Navegação principal">
          <a className="brand" href="#inicio" aria-label="Ir para o início" onClick={closeMenu}>
            EL<span>.</span>
          </a>

          <div className="nav-links">
            {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          </div>

          <a className="nav-contact" href={`mailto:${profile.email}`}>
            Entrar em contato
          </a>

          <button
            className="nav-menu-button"
            type="button"
            aria-label="Abrir menu de navegação"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen(true)}
          >
            <span />
            <span />
          </button>
        </nav>
      </div>

      <div
        id="mobile-navigation"
        className={`mobile-navigation${isMenuOpen ? " is-open" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="mobile-navigation-header">
          <span className="brand">EL<span>.</span></span>
          <button className="nav-close-button" type="button" aria-label="Fechar menu" onClick={closeMenu}>
            <span />
            <span />
          </button>
        </div>

        <nav aria-label="Navegação mobile">
          <a href="#inicio" onClick={closeMenu}>Início</a>
          {navItems.map((item) => <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>)}
          <a className="mobile-contact-link" href={`mailto:${profile.email}`} onClick={closeMenu}>Contato</a>
        </nav>

        <p className="mobile-navigation-meta">Analista de Sistemas · .NET · Angular · QA</p>
      </div>
    </>
  );
}
