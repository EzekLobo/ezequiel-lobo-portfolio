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
