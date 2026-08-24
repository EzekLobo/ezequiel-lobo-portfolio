import { certifications, education, experiences, languages } from "@/content/portfolio";

export default function Experience() {
  return (
    <section id="trajetoria" className="journey section-shell content-section">
      <div className="section-heading">
        <p className="section-kicker">03 · Experiência</p>
        <h2>Experiência em análise, desenvolvimento e QA.</h2>
        <p>
          Atuação profissional e formação que mostram como transformo demandas
          em software, testes e documentação.
        </p>
      </div>

      <div className="journey-body">
        <p className="subsection-label">Experiência profissional</p>
        <ol className="journey-list">
          {experiences.map((item, index) => (
            <li key={`${item.company}-${item.title}`}>
              <span className="journey-index">0{index + 1}</span>
              <div>
                <p className="journey-context">{item.company} · {item.period}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul className="experience-highlights">
                  {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <div className="experience-aside">
          <div className="aside-block">
            <p className="subsection-label">Formação acadêmica</p>
            <ul className="aside-list">
              {education.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.institution} · {item.period}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="aside-block">
            <p className="subsection-label">Cursos e certificações</p>
            <ul className="aside-list">
              {certifications.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.institution} · {item.period}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="aside-block">
            <p className="subsection-label">Idiomas</p>
            <ul className="aside-list aside-list-inline">
              {languages.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}</strong>
                  <span>{item.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
