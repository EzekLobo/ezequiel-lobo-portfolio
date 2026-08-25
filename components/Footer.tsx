import { profile } from "@/content/portfolio";
import { GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from "./Icons";

export default function Footer() {
  return (
    <footer id="contato" data-scroll-window className="relative z-10 mt-auto flex min-h-screen items-center overflow-hidden border-t border-white/5 bg-brand-dark/80 backdrop-blur-md">
      <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-brand-red/10 blur-[140px]" />
      <div data-scroll-focus className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
        <div className="text-center lg:text-left">
          <p className="font-mono text-xs font-bold tracking-[0.18em] text-brand-red uppercase">Contato profissional</p>
          <h2 className="mt-4 max-w-xl text-4xl leading-tight font-black tracking-tight text-white md:text-6xl">Vamos construir a próxima entrega?</h2>
          <p className="mx-auto mt-6 max-w-lg border-l-4 border-brand-red/50 pl-4 text-left text-base leading-relaxed text-gray-400 md:text-lg lg:mx-0">Estou disponível para oportunidades de desenvolvimento de software, conversas técnicas e processos seletivos.</p>
          <p className="mt-8 font-mono text-xs tracking-wide text-gray-500 uppercase">{profile.location} · Remoto ou híbrido</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 text-center shadow-2xl backdrop-blur-sm sm:p-7">
          <p className="font-mono text-[10px] tracking-[0.18em] text-gray-500 uppercase">Canais diretos</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <a href={`mailto:${profile.email}`} className="flex min-h-32 flex-col items-center justify-center rounded-2xl border border-white/10 bg-black/20 p-5 transition-colors hover:border-brand-red/50 hover:bg-white/5"><MailIcon className="h-5 w-5 text-brand-red" /><p className="mt-5 text-xs text-gray-500">E-mail</p><p className="mt-1 break-all font-mono text-sm text-white">{profile.email}</p></a>
            <a href={`tel:${profile.phone.replace(/\D/g, "")}`} className="flex min-h-32 flex-col items-center justify-center rounded-2xl border border-white/10 bg-black/20 p-5 transition-colors hover:border-brand-red/50 hover:bg-white/5"><PhoneIcon className="h-5 w-5 text-brand-red" /><p className="mt-5 text-xs text-gray-500">Telefone</p><p className="mt-1 font-mono text-sm text-white">{profile.phone}</p></a>
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 font-mono text-sm text-gray-300 transition-colors hover:border-white/30 hover:text-white"><GitHubIcon className="h-4 w-4" />GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 font-mono text-sm text-gray-300 transition-colors hover:border-white/30 hover:text-white"><LinkedInIcon className="h-4 w-4" />LinkedIn</a>
          </div>
          <div className="mt-7 border-t border-white/10 pt-5"><p className="text-xs text-gray-600">© {new Date().getFullYear()} {profile.name}. Todos os direitos reservados.</p></div>
        </div>
      </div>
    </footer>
  );
}
