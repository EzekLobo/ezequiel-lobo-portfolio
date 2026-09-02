import Image from "next/image";
import { profile } from "@/content/portfolio";
import { DownloadIcon, GitHubIcon, LinkedInIcon } from "./Icons";
import OrbitingTechnologies from "./OrbitingTechnologies";

export default function Hero() {
  const names = profile.displayName.split(" ");
  const firstName = names[0];
  const restOfName = names.slice(1).join(" ");

  return (
    <header id="inicio" data-scroll-window className="relative z-10 flex min-h-[100svh] items-center">
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-brand-red/15 blur-[128px]" />
      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-24 lg:grid-cols-[1.1fr_.9fr] lg:gap-16 lg:py-0">
        <div className="order-2 min-w-0 space-y-8 text-center animate-enter lg:order-1 lg:text-left">
          <div className="space-y-2">
            <h1 className="text-4xl leading-[1.05] font-black tracking-tight sm:text-5xl md:text-7xl">
              {firstName}{" "}
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-600 bg-clip-text text-transparent">{restOfName}</span>
            </h1>
            <h2 className="pt-2 text-center font-mono text-sm font-medium text-brand-red sm:text-lg md:text-2xl"><span aria-hidden="true" className="text-white/70">&lt; </span>{profile.role}<span aria-hidden="true" className="text-white/70"> /&gt;</span></h2>
            <p className="text-center font-mono text-[11px] tracking-wide text-gray-500 uppercase sm:text-xs">{profile.headline}</p>
          </div>
          <p className="mx-auto w-full max-w-lg border-l-4 border-brand-red/50 pl-4 text-justify text-base leading-relaxed text-gray-400 md:text-lg lg:mx-0">{profile.introduction}</p>
          <div className="flex w-full flex-wrap justify-center gap-2 pt-2 lg:justify-start">
            <a href="/cv/ezequiel-lobo-oliveira.pdf" download className="flex items-center justify-center gap-2 rounded-xl bg-brand-red px-3 py-3.5 font-bold text-white shadow-[0_0_20px_-5px_rgba(255,77,77,.36)] transition-all hover:bg-red-500 sm:px-4 md:px-6"><DownloadIcon className="h-5 w-5" /><span className="font-mono text-sm">Baixar CV</span></a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3.5 font-bold text-gray-400 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white sm:px-4 md:px-5"><GitHubIcon className="h-5 w-5" /><span className="font-mono text-sm">GitHub</span></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3.5 font-bold text-gray-400 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white sm:px-4 md:px-5"><LinkedInIcon className="h-5 w-5" /><span className="font-mono text-sm">LinkedIn</span></a>
          </div>
        </div>
        <div className="order-1 flex min-h-[25rem] w-full items-center justify-center sm:min-h-[32rem] lg:order-2 lg:min-h-[36rem] xl:min-h-[38rem]">
          <div className="relative flex h-[25rem] w-64 items-center justify-center sm:h-[32rem] sm:w-[25rem] lg:h-[36rem] lg:w-[28rem] lg:translate-x-3 lg:-translate-y-16 xl:h-[38rem] xl:translate-x-[4.5rem] xl:-translate-y-[5.5rem]">
            <div className="absolute bottom-0 z-0 aspect-square w-[96%]">
              <div aria-hidden="true" className="absolute inset-0 rounded-full border border-white/[0.06] bg-[#151515] shadow-[0_0_70px_rgba(0,0,0,.7)]" />
            </div>
            <div className="absolute bottom-0 z-20 aspect-square w-[96%]">
              <OrbitingTechnologies />
            </div>
            <div className="hero-portrait-bottom-mask relative z-10 h-full w-full">
              <Image src="/profile/ezequiel-portrait-circle-cut.png" alt={profile.name} fill priority sizes="(max-width: 640px) 256px, (max-width: 1024px) 400px, 480px" className="object-contain object-bottom grayscale contrast-110" />
            </div>
            <div aria-hidden="true" className="absolute inset-0 z-30 [clip-path:inset(0_0_50%_0)]">
              <Image src="/profile/ezequiel-portrait-circle-cut.png" alt="" fill priority sizes="(max-width: 640px) 256px, (max-width: 1024px) 400px, 480px" className="object-contain object-bottom grayscale contrast-110" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
