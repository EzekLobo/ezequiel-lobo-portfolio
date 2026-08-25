import { profile } from "@/content/portfolio";
import { ArrowUpRightIcon } from "./Icons";

export default function Footer() {
  return (
    <footer id="contato" className="footer">
      <div className="section-shell footer-main">
        <div className="footer-intro">
          <p className="section-kicker">04 · Contato</p>
          <h2>Vamos conversar sobre software.</h2>
          <p>
            Procuro oportunidades em análise e desenvolvimento de sistemas, com
            foco em .NET, Angular e qualidade de software.
          </p>
        </div>

        <div className="footer-actions">
          <a className="footer-email" href={`mailto:${profile.email}`}>
            {profile.email} <ArrowUpRightIcon />
          </a>
          <div className="footer-contact">
            <a href={`tel:${profile.phone.replace(/\D/g, "")}`}>{profile.phone}</a>
            <span aria-hidden="true">·</span>
            <span>{profile.location}</span>
          </div>
        </div>
      </div>

      <div className="section-shell footer-bottom">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <div>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="#inicio">Voltar ao início ↑</a>
        </div>
      </div>
    </footer>
  );
}
