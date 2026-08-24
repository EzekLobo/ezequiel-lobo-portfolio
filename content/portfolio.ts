import type { CertificationItem, EducationItem, ExperienceItem, Project } from "@/types";

export const profile = {
  name: "Ezequiel Lobo Oliveira",
  role: "Analista de Sistemas | Desenvolvimento de Software",
  headline: "Transformo demandas reais em software claro, útil e sustentável.",
  introduction:
    "Bacharel em Ciência da Computação e técnico em Informática, atuo da análise de demandas à entrega e sustentação de soluções, conectando regras de negócio, dados e desenvolvimento full stack.",
  phone: "(73) 99168-8956",
  location: "Ilhéus, BA",
  email: "ezeklobo@gmail.com",
  github: "https://github.com/EzekLobo",
  linkedin: "https://www.linkedin.com/in/ezequiel-lobo-a1336b326/",
};

export const skills = [
  {
    area: "Desenvolvimento",
    items: ["C#", "ASP.NET Core", "Angular", "TypeScript", "APIs REST"],
  },
  {
    area: "Dados & qualidade",
    items: ["SQL Server", "Modelagem de dados", "Testes manuais", "Testes automatizados", "Git"],
  },
  {
    area: "Atuação",
    items: ["Regras de negócio", "Documentação técnica", "Suporte e sustentação", "Metodologias ágeis"],
  },
];

export const experiences: ExperienceItem[] = [
  {
    title: "Analista de Sistemas",
    company: "Daten Tecnologia",
    period: "Abril 2026 — Atual",
    description:
      "Atuação em todas as etapas do desenvolvimento de sistemas, da análise das demandas à entrega e sustentação das soluções.",
    highlights: [
      "Análise de demandas, definição de regras de negócio e modelagem de bancos de dados",
      "Desenvolvimento full stack com C#, ASP.NET Core, SQL Server e Angular",
      "Documentação técnica, suporte, investigação e correção de falhas",
    ],
  },
  {
    title: "Tutor de Programação",
    company: "Kodland",
    period: "Janeiro 2026 — Atual",
    description:
      "Ensino de lógica e fundamentos de programação por meio de projetos práticos em aulas online.",
    highlights: [
      "Acompanhamento da evolução dos alunos",
      "Adaptação das explicações ao nível e ao ritmo de cada estudante",
    ],
  },
  {
    title: "Desenvolvedor Backend e QA",
    company: "Residência TIC36",
    period: "Julho 2024 — Outubro 2025",
    description:
      "Formação e atuação em qualidade de software e desenvolvimento backend em parceria com a Daten.",
    highlights: [
      "Planejamento e execução de testes manuais, integrados e automatizados",
      "Proposta classificada entre as dez melhores no Hackathon Tecnologia que Transforma, entre aproximadamente 100 equipes",
      "Desenvolvimento de um sistema de gestão de inventário com .NET em equipe multidisciplinar e metodologia ágil",
    ],
  },
  {
    title: "Desenvolvedor Full Stack",
    company: "Residência TIC18",
    period: "Agosto 2023 — Junho 2024",
    description:
      "Formação prática em desenvolvimento de software, avançando dos fundamentos de programação à construção de aplicações web.",
    highlights: [
      "Especialização em C#, ASP.NET Core, Angular e TypeScript",
      "Construção de APIs REST, autenticação, regras de negócio e persistência de dados",
      "Aplicação de boas práticas de arquitetura, modelagem, versionamento e revisão de código",
    ],
  },
];

export const education: EducationItem[] = [
  {
    title: "Bacharelado em Ciência da Computação",
    institution: "UESC",
    period: "Agosto 2021 — Junho 2026",
  },
  {
    title: "Técnico em Informática",
    institution: "IFBA",
    period: "2018 — 2021",
  },
];

export const certifications: CertificationItem[] = [
  { title: "Fundamentos de IA Generativa", institution: "DIO e Universia", period: "Dezembro 2025 — Janeiro 2026" },
  { title: "Kanban: análises para implementação", institution: "Alura", period: "Dezembro 2024" },
  { title: "Scrum: agilidade em seu projeto", institution: "Alura", period: "Novembro 2024" },
  { title: "Cultura e Métodos Ágeis: pilares para uma imersão avançada", institution: "Alura", period: "Novembro 2024" },
  { title: "Comunicação assertiva: reduzindo conflitos e frustrações", institution: "Alura", period: "Agosto 2024" },
];

export const languages = [
  { name: "Inglês", level: "Básico — em desenvolvimento" },
  { name: "Espanhol", level: "Intermediário" },
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
