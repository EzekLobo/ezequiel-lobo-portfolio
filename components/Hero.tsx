import Image from "next/image";
import { ArrowDownIcon, ArrowUpRightIcon } from "./Icons";
import { profile } from "@/content/portfolio";

export default function Hero() {
  return (
    <header id="inicio" className="hero section-shell">
      <div className="hero-copy">
        <p className="availability">
          <span aria-hidden="true" /> Aberto a oportunidades em desenvolvimento
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
            <strong>Sistemas</strong>
            <span>da demanda à sustentação</span>
          </li>
          <li>
            <strong>Full stack</strong>
            <span>C#, ASP.NET Core e Angular</span>
          </li>
          <li>
            <strong>Qualidade</strong>
            <span>testes, suporte e documentação</span>
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
            <span>Software com propósito</span>
          </div>
        </div>
      </div>
    </header>
  );
}
