import type { JourneyItem, Project } from "@/types";

export const profile = {
  name: "Ezequiel Lobo",
  role: "Desenvolvedor Backend com visão full stack",
  headline: "Transformo regras de negócio em software claro, útil e testável.",
  introduction:
    "Graduando em Ciência da Computação e técnico em Informática, desenvolvo aplicações web e mobile com atenção à arquitetura, aos dados e à experiência de quem usa.",
  email: "ezeklobo.dev@gmail.com",
  github: "https://github.com/EzekLobo",
  linkedin: "https://www.linkedin.com/in/ezequiel-lobo-a1336b326/",
};

export const skills = [
  {
    area: "Backend",
    items: ["Python", "Django REST", ".NET", "APIs REST", "SQL"],
  },
  {
    area: "Frontend & mobile",
    items: ["TypeScript", "Next.js", "Angular", "React Native", "Expo"],
  },
  {
    area: "Engenharia",
    items: ["Modelagem de dados", "Testes automatizados", "Git", "Arquitetura limpa"],
  },
];

export const projects: Project[] = [
  {
    title: "InventoryRFID",
    eyebrow: "Projeto principal · Full stack · TCC",
    summary:
      "Protótipo web para gestão de inventário patrimonial com suporte a RFID, auditorias e histórico operacional.",
    problem:
      "Inventários manuais tornam a conferência lenta e dificultam identificar itens ausentes, desconhecidos ou em locais divergentes.",
    contribution:
      "Estruturei o domínio, a API Django REST, a interface Next.js e o fluxo de comunicação com leitores RFID, separando autenticação de usuários e dispositivos.",
    evidence: [
      "Auditorias comparando itens esperados e detectados",
      "Registro de leituras, movimentações e inconsistências",
      "Testes de backend, lint e build automatizados",
    ],
    technologies: ["Python", "Django REST", "Next.js", "TypeScript", "RFID"],
    repository: "https://github.com/EzekLobo/inventory-rfid",
    demo: "https://inventory-rfid.vercel.app",
    image: "/projects/inventory-rfid.png",
    imageAlt: "Dashboard do sistema InventoryRFID",
    featured: true,
  },
  {
    title: "AulaPay",
    eyebrow: "Aplicativo mobile · Produto pessoal",
    summary:
      "Aplicativo para professores acompanharem aulas, turmas, períodos de pagamento e valores recebidos ou previstos.",
    problem:
      "Aulas normais e extras, cancelamentos e datas de pagamento geram cálculos repetitivos e pouca previsibilidade financeira.",
    contribution:
      "Implementei regras de cálculo por período, geração de aulas recorrentes, persistência local e uma suíte de testes para cálculos, validações e armazenamento.",
    evidence: [
      "Resumo de valores realizados, recebidos e futuros",
      "Persistência offline com SQLite",
      "Testes automatizados com Vitest",
    ],
    technologies: ["React Native", "Expo", "TypeScript", "SQLite", "Vitest"],
    repository: "https://github.com/EzekLobo/professor-pay-app",
  },
  {
    title: "Go distribuído 9×9",
    eyebrow: "Sistemas distribuídos · Projeto acadêmico",
    summary:
      "Jogo de Go para dois jogadores em máquinas diferentes, com interface gráfica e comunicação RPC em Python.",
    problem:
      "Sincronizar regras, turnos e estado de uma partida entre dois processos conectados pela rede.",
    contribution:
      "Desenvolvi a lógica de captura, liberdades, Ko e pontuação, além da descoberta automática de host/cliente e da comunicação por XML-RPC.",
    evidence: [
      "Concorrência para manter rede e interface responsivas",
      "Algoritmo flood-fill para cálculo de território",
      "Testes unitários das regras do jogo",
    ],
    technologies: ["Python", "XML-RPC", "Tkinter", "Threading", "Unittest"],
    repository: "https://github.com/EzekLobo/Sistemas_Distribuidos-UESC",
    visual: "go-board",
  },
];

export const journey: JourneyItem[] = [
  {
    title: "Ciência da Computação",
    context: "UESC · Em formação",
    description:
      "Base em engenharia de software, sistemas distribuídos, banco de dados e desenvolvimento de aplicações.",
  },
  {
    title: "Desenvolvimento web",
    context: "Experiência prática",
    description:
      "Construção de aplicações com .NET e Angular, aplicando MVC, organização por camadas e modelagem de dados.",
  },
  {
    title: "Formação técnica em Informática",
    context: "Fundação profissional",
    description:
      "Contato inicial com programação, infraestrutura e resolução estruturada de problemas técnicos.",
  },
];
