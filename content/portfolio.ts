import type { Project } from "@/types";

export const profile = {
  name: "Ezequiel Lobo Oliveira",
  displayName: "Ezequiel Lobo",
  role: "Analista de Sistemas",
  headline: "APIs, regras de negócio e qualidade de software.",
  introduction:
    "Atuo no desenvolvimento de sistemas, transformando ideias, necessidades e problemas do dia a dia em soluções de software, partindo da compreensão das demandas para organizar regras de negócio e desenvolver aplicações que apoiem pessoas e processos.",
  phone: "(73) 99168-8956",
  location: "Ilhéus, BA",
  email: "ezeklobo.dev@gmail.com",
  github: "https://github.com/EzekLobo",
  linkedin: "https://www.linkedin.com/in/ezequiel-lobo-a1336b326/",
};

export const siteUrl = "https://projeto-portfolio-dinamico-shui.vercel.app";

export const projects: Project[] = [
  {
    title: "InventoryRFID",
    eyebrow: "TCC · Aplicação web · Inventário",
    summary:
      "Protótipo web para gestão de inventário patrimonial com suporte a RFID, auditorias e histórico operacional.",
    problem:
      "Inventários manuais tornam a conferência lenta e dificultam identificar itens ausentes, desconhecidos ou em locais divergentes.",
    contribution:
      "Estruturei o domínio, a API Django REST, a interface Next.js e a comunicação com leitores RFID. Separei autenticação de usuários e dispositivos para isolar os fluxos operacionais.",
    evidence: [
      "Auditorias comparando itens esperados e detectados",
      "Registro de leituras, movimentações e inconsistências",
      "Testes do backend; lint e build disponíveis no repositório",
    ],
    technologies: ["Python", "Django REST", "Next.js", "TypeScript", "RFID"],
    repository: "https://github.com/EzekLobo/inventory-rfid",
    demo: "https://inventory-rfid.vercel.app",
    image: "/projects/inventory-rfid.png",
    presentation: "desktop",
    imageAlt: "Dashboard do sistema InventoryRFID",
    featured: true,
  },
  {
    title: "AulaPay",
    eyebrow: "Produto pessoal · Aplicativo mobile",
    summary:
      "Aplicativo para professores acompanharem aulas, turmas, períodos de pagamento e valores recebidos ou previstos.",
    problem:
      "Aulas normais e extras, cancelamentos e datas de pagamento geram cálculos repetitivos e pouca previsibilidade financeira.",
    contribution:
      "Implementei regras de cálculo por período, geração de aulas recorrentes, persistência local e testes para cálculos, validações e armazenamento.",
    evidence: [
      "Resumo de valores realizados, recebidos e futuros",
      "Persistência offline com SQLite",
      "Testes automatizados com Vitest",
    ],
    technologies: ["React Native", "Expo", "TypeScript", "SQLite", "Vitest"],
    repository: "https://github.com/EzekLobo/professor-pay-app",
    image: "/projects/aulapay-dashboard.jpeg",
    presentation: "mobile",
    imageAlt: "Tela inicial do aplicativo AulaPay com aulas e turmas",
  },
  {
    title: "Go distribuído 9×9",
    eyebrow: "Projeto acadêmico · Sistemas distribuídos",
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
    image: "/projects/go-distribuido-preview.svg",
    presentation: "desktop",
    imageAlt: "Tabuleiro de Go com comunicação distribuída entre host e cliente",
  },
];
