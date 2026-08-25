import { experiences } from "@/content/portfolio";

export default function Experience() {
  return (
    <section id="experiencia" className="relative z-10 border-t border-white/5 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold">Experiência <span className="text-brand-red">profissional</span></h2>
          <div className="mt-4 h-1 w-20 rounded bg-brand-red" />
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-gray-400">Um resumo das experiências que sustentam o trabalho apresentado nos projetos. Formação, cursos e demais detalhes ficam no currículo.</p>
        </div>
        <ol className="relative ml-3 space-y-12 border-l-2 border-white/10 pl-8" aria-label="Experiência profissional">
          {experiences.map((item) => (
            <li key={`${item.company}-${item.title}`} className="group relative">
              <span className="absolute -left-[41px] top-2 h-5 w-5 rounded-full border-4 border-brand-dark bg-brand-red transition-transform group-hover:scale-125" />
              <h3 className="text-xl font-bold text-white transition-colors group-hover:text-brand-red">{item.title}</h3>
              <div className="mt-1 mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                <span className="text-sm font-semibold text-gray-300">{item.company}</span><span className="hidden text-gray-600 sm:block">•</span><p className="font-mono text-xs tracking-wider text-brand-red uppercase">{item.period}</p>
              </div>
              <div className="mb-4 rounded-lg border border-white/5 bg-white/5 p-4 shadow-sm"><p className="text-sm leading-relaxed text-gray-400">{item.description}</p></div>
              <ul className="flex flex-wrap gap-2" aria-label={`Destaques de ${item.title}`}>
                {item.highlights.map((highlight) => <li key={highlight} className="rounded border border-white/10 px-2 py-1 text-[10px] font-medium text-gray-500 uppercase transition-colors hover:border-brand-red/30 hover:text-gray-300">{highlight}</li>)}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
