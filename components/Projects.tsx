import { projects } from "@/content/portfolio";
import ProjectCarousel from "./ProjectCarousel";

export default function Projects() {
  return (
    <section id="projetos" data-scroll-window className="relative z-10 overflow-hidden border-t border-white/5 bg-black/20 py-24">
      <div className="relative z-20 mx-auto mb-8 max-w-7xl px-6 text-left">
        <h2 className="text-3xl font-bold">Meus <span className="text-brand-red">Projetos</span></h2>
        <div className="mt-4 h-1 w-12 rounded bg-brand-red" />
      </div>
      <div data-scroll-focus><ProjectCarousel projects={projects} /></div>
    </section>
  );
}
