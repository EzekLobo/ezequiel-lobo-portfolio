import Image from "next/image";
import { ArrowDownIcon, ArrowUpRightIcon } from "./Icons";
import { profile } from "@/content/portfolio";

export default function Hero() {
  return (
    <header id="inicio" className="hero section-shell">
      <div className="hero-copy">
        <p className="availability">
          <span aria-hidden="true" /> Disponível para oportunidades em desenvolvimento de software
        </p>

        <p className="hero-role">{profile.role}</p>
        <h1>{profile.headline}</h1>
        <p className="hero-intro">{profile.introduction}</p>

        <div className="hero-actions" aria-label="Ações principais">
          <a className="button button-primary" href="#projetos">
            Ver projetos <ArrowDownIcon />
          </a>
          <a
            className="button button-secondary"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <ArrowUpRightIcon />
          </a>
        </div>

        <ul className="hero-facts" aria-label="Resumo profissional">
          <li>
            <strong>4 experiências</strong>
            <span>sistemas, QA e ensino</span>
          </li>
          <li>
            <strong>.NET + Angular</strong>
            <span>APIs, dados e interfaces</span>
          </li>
          <li>
            <strong>3 projetos</strong>
            <span>código público no GitHub</span>
          </li>
        </ul>
      </div>

      <div className="portrait-wrap" aria-label={`Foto de ${profile.name}`}>
        <div className="portrait-frame">
          <Image
            src="/profile/ezequiel.jpg"
            alt={profile.name}
            fill
            sizes="(max-width: 860px) 70vw, 380px"
            priority
            className="portrait-image"
          />
          <div className="portrait-caption" aria-hidden="true">
            <span>01</span>
            <span>Análise · código · qualidade</span>
          </div>
        </div>
      </div>
    </header>
  );
}
