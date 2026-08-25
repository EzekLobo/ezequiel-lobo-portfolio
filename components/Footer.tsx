import { profile } from "@/content/portfolio";
import { MailIcon, PhoneIcon } from "./Icons";

export default function Footer() {
  return (
    <footer id="contato" data-scroll-window className="relative z-10 mt-auto flex min-h-screen items-center border-t border-white/5 bg-brand-dark/80 text-center backdrop-blur-md">
      <div data-scroll-focus className="mx-auto w-full max-w-4xl px-6 py-16">
        <h2 className="mb-2 text-2xl font-bold text-white">Vamos conversar sobre uma oportunidade?</h2>
        <p className="mb-6 text-sm text-gray-400">Disponível para processos seletivos e conversas sobre desenvolvimento de software.</p>
        <div className="flex flex-col items-center justify-center gap-4 font-mono text-sm text-gray-300 md:flex-row md:gap-6">
          <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded border border-white/5 bg-white/5 px-4 py-2 transition-colors hover:border-brand-red/50 hover:text-white"><MailIcon className="h-4 w-4" />{profile.email}</a>
          <a href={`tel:${profile.phone.replace(/\D/g, "")}`} className="inline-flex items-center gap-2 rounded border border-white/5 bg-white/5 px-4 py-2 transition-colors hover:border-brand-red/50 hover:text-white"><PhoneIcon className="h-4 w-4" />{profile.phone}</a>
        </div>
        <div className="mt-8 border-t border-white/5 pt-6"><p className="text-xs text-gray-600">© {new Date().getFullYear()} {profile.name}. Todos os direitos reservados.</p></div>
      </div>
    </footer>
  );
}
