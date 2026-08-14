import { profile } from "@/content/portfolio";

export default function Navbar() {
  return (
    <div className="nav-wrap">
      <nav className="navbar section-shell" aria-label="Navegação principal">
        <a className="brand" href="#inicio" aria-label="Ir para o início">
          EL<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#projetos">Projetos</a>
          <a href="#competencias">Competências</a>
          <a href="#trajetoria">Trajetória</a>
        </div>

        <a className="nav-contact" href={`mailto:${profile.email}`}>
          Vamos conversar
        </a>
      </nav>
    </div>
  );
}
