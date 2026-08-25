import Image from "next/image";
import { profile } from "@/content/portfolio";

export default function Hero() {
  const names = profile.name.split(" ");
  const firstName = names[0];
  const restOfName = names.slice(1).join(" ");

  return (
    <header id="inicio" className="relative z-10 flex min-h-screen items-center pt-20">
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-brand-red/15 blur-[128px]" />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <div className="order-2 space-y-8 text-center animate-enter lg:order-1 lg:text-left">
          <div className="space-y-2">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-brand-red">Disponível para oportunidades</p>
            <h1 className="text-5xl leading-[1.05] font-black tracking-tight md:text-7xl">
              {firstName}<br />
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-600 bg-clip-text text-transparent">{restOfName}.</span>
            </h1>
            <h2 className="pt-2 font-mono text-lg font-medium text-brand-red md:text-2xl">&lt; .NET / Angular / QA /&gt;</h2>
          </div>
          <p className="mx-auto max-w-lg border-l-4 border-brand-red/50 pl-4 text-base leading-relaxed text-gray-400 md:text-lg lg:mx-0">{profile.introduction}</p>
          <div className="flex flex-nowrap justify-center gap-3 pt-2 lg:justify-start">
            <a href="#projetos" className="flex items-center justify-center gap-2 rounded-xl bg-brand-red px-4 py-3.5 font-bold text-white shadow-[0_0_20px_-5px_rgba(255,77,77,.36)] transition-all hover:bg-red-500 md:px-6"><span className="font-mono text-sm">Ver projetos</span><span aria-hidden="true">↓</span></a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 font-bold text-gray-400 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white md:px-5"><span className="font-mono text-sm">GitHub</span><span aria-hidden="true">↗</span></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 font-bold text-gray-400 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white md:px-5"><span className="font-mono text-sm">LinkedIn</span><span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="order-1 mt-8 flex h-full items-center justify-center lg:order-2 lg:mt-0">
          <div className="group relative mx-auto w-52 rotate-3 rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl transition-transform duration-500 hover:rotate-0 md:w-80">
            <div className="absolute -top-5 -right-2 z-20 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-950/90 px-3 py-1.5 text-[10px] font-bold tracking-widest text-green-400 uppercase shadow-lg backdrop-blur-md md:text-xs"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" /></span>Open to work</div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-brand-card"><Image src="/profile/ezequiel.jpg" alt={profile.name} fill priority sizes="(max-width: 768px) 208px, 320px" className="object-cover grayscale-[20%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" /></div>
          </div>
        </div>
      </div>
    </header>
  );
}
