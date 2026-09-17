# Plano: reincorporação da identidade visual antiga

## Tarefa 1 — Identidade visual, navegação e experiência

- **Escopo:** Reaplicar a linguagem visual da implementação em `legacy/main` — fundo escuro com grid técnico, acento terracota suave, navegação flutuante responsiva, rodapé compacto e experiência em formato de timeline — preservando os dados atuais do currículo.
- **Aceitação:** `Navbar`, `Experience`, `Footer` e `app/globals.css` refletem a linguagem antiga sem API/backend legado; a grade da experiência não sobrepõe colunas; mobile mantém navegação utilizável; lint passa.
- **Dependências:** Nenhuma. Preservar a paleta/layout já corrigidos que estejam no working tree.
- [x] Implementado e validado com `npm.cmd run lint`.

## Tarefa 2 — Carrossel infinito com destaque central

- **Escopo:** Adaptar `ProjectCarousel` para o comportamento do slider antigo, mantendo o card central completo e usando projetos laterais como prévias: setas laterais, roda do mouse, arraste, teclado, indicadores e navegação circular.
- **Aceitação:** O primeiro e o último projeto conectam-se nos dois sentidos; o card central fica destacado; há prévias visíveis nas bordas; wheel/drag/setas/dots/teclado funcionam; não há overflow horizontal no mobile.
- **Dependências:** Tarefa 1 concluída; usa a paleta e os tokens CSS estabilizados.
- [x] Implementado e validado com `npm.cmd run lint`.

## Tarefa 3 — Verificação final e sincronização

- **Escopo:** Executar lint, build e inspeção visual em desktop/mobile, corrigir regressões e sincronizar a branch `main`.
- **Aceitação:** `npm.cmd run lint` e `npm.cmd run build` passam; validação visual não mostra sobreposição/overflow; git limpo e `main` enviada para `origin`.
- **Dependências:** Tarefas 1 e 2 concluídas.
- [x] Implementado e validado com lint, build e inspeção visual desktop/mobile.

## Log de handoff

- Plano criado. A implementação antiga está em `legacy/main:Front/portfolio-front`; o backend e as chamadas de API legados não serão reutilizados.
- Tarefa 1 concluída: `Navbar`, `Experience`, `Footer` e `app/globals.css` agora usam grid técnico, navegação flutuante responsiva, timeline e rodapé compacto. O carrossel permanece inalterado para a tarefa 2.
- Tarefa 2 concluída: `ProjectCarousel` ganhou navegação circular, previas laterais, setas nas bordas, roda do mouse, arraste por pointer, atalhos de teclado e indicadores. O card central preserva todas as informações do projeto.
- Tarefa 3 concluída: lint e build passaram; desktop exibiu prévias laterais e navegação circular; mobile não apresentou overflow horizontal; a grade de experiência foi verificada sem sobreposição.

## Plano atual — migração de projetos legados e carrossel

- **Tarefa 4 — Export e capas legadas:** materializar a resposta da API antiga em `tmp/legacy-import/projects.json`, baixar as capas dos projetos não excluídos e corrigir o repositório duplicado do Sistema Bancário com base no repositório público correspondente.
  - **Aceitação:** JSON preservado, quatro capas legadas locais existentes e nenhum arquivo em `tmp/pdfs/` ou `public/cv/` alterado.
  - **Dependências:** Nenhuma.
  - [x] Validado: export com 5 registros, 1 excluído e 4 capas baixadas.
- **Tarefa 5 — Dados estáticos consolidados:** unir projetos legados e atuais sem duplicidade de repositório, excluindo apenas o projeto do portfólio, e tornar os metadados ricos opcionais no tipo `Project`.
  - **Aceitação:** lista final contém InventoryRFID, AulaPay, Fundamentos de IA Generativa, Go, Sistema Bancário e EcoSync; o projeto `Projeto_Portfolio_Dinamico` não aparece; repositórios são únicos.
  - **Dependências:** Tarefa 4.
  - [ ] Pendente
- **Tarefa 6 — Carrossel alinhado ao legado:** substituir o layout de molduras detalhadas pelo card de `75vw`/`24rem` por `420px`, capa de `208px`, flip, previews, navegação circular, arraste, roda, teclado e indicadores.
  - **Aceitação:** cards ativos/laterais têm escala e opacidade distintas; capas locais carregam; frente e verso funcionam; mobile não apresenta overflow horizontal.
  - **Dependências:** Tarefa 5.
  - [ ] Pendente
- **Tarefa 7 — Verificação final:** executar lint, build e inspeção visual desktop/mobile.
  - **Aceitação:** `npm.cmd run lint` e `npm.cmd run build` passam; interações do carrossel são verificadas; alterações locais preexistentes permanecem intactas.
  - **Dependências:** Tarefas 5 e 6.
  - [ ] Pendente

## Log de handoff — plano atual

- Export recuperado da API antiga em 17/09/2026; o registro do portfólio será excluído e o link duplicado do Sistema Bancário será normalizado para `Cepedi.Banco.Pessoa-ResTIC18`.
- Tarefa 4 concluída: `tmp/legacy-import/projects.json` preserva os 5 registros da API; o portfólio foi identificado para exclusão e as quatro capas migráveis foram salvas em `public/projects/legacy/`.
