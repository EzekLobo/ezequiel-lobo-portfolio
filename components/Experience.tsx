import { journey } from "@/content/portfolio";

export default function Experience() {
  return (
    <section id="trajetoria" className="journey section-shell content-section">
      <div className="section-heading">
        <p className="section-kicker">03 · Trajetória</p>
        <h2>Base técnica e aprendizado aplicado.</h2>
        <p>
          Uma formação que combina fundamentos acadêmicos, prática profissional e
          projetos autorais completos.
        </p>
      </div>

      <ol className="journey-list">
        {journey.map((item, index) => (
          <li key={item.title}>
            <span className="journey-index">0{index + 1}</span>
            <div>
              <p className="journey-context">{item.context}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
