import { profile } from "@/content/portfolio";
import { ArrowUpRightIcon } from "./Icons";

export default function Footer() {
  return (
    <footer id="contato" className="footer">
      <div className="section-shell footer-main">
        <p className="section-kicker">04 · Contato</p>
        <h2>Tem um problema interessante para resolver?</h2>
        <p>
          Estou aberto a oportunidades de desenvolvimento e a conversas sobre
          produtos que precisam sair do papel.
        </p>
        <a className="footer-email" href={`mailto:${profile.email}`}>
          {profile.email} <ArrowUpRightIcon />
        </a>
        <p className="footer-contact">{profile.phone} · {profile.location}</p>
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
