import { skills } from "@/content/portfolio";

export default function Skills() {
  return (
    <section id="competencias" className="skills-section">
      <div className="section-shell content-section">
        <div className="section-heading section-heading-split">
          <div>
            <p className="section-kicker">02 · Competências</p>
            <h2>Stack usada para entregar software.</h2>
          </div>
          <p>
            Tecnologias e práticas presentes nos projetos autorais e na
            experiência profissional.
          </p>
        </div>

        <div className="skill-grid">
          {skills.map((skill) => (
            <article key={skill.area}>
              <h3>{skill.area}</h3>
              <ul>
                {skill.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
