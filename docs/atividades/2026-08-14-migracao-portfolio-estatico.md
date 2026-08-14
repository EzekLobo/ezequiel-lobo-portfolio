# Migração do portfólio para aplicação estática

## Objetivo

Consolidar o portfólio em uma única aplicação Next.js publicável no Vercel,
eliminando a dependência do backend Django e da integração IoT.

## Contexto

O frontend dependia de uma API hospedada separadamente para carregar perfil,
experiências, projetos e telemetria. Os endpoints externos estavam indisponíveis
e o backend mantinha configurações e modelos inconsistentes.

## Fonte de verdade

- Repositórios públicos do perfil `EzekLobo` no GitHub.
- README e código dos projetos InventoryRFID, AulaPay e Go distribuído.
- Recomendações públicas do GitHub, LinkedIn e Indeed para portfólios técnicos.

## Passos executados

1. Seleção de três projetos com evidências técnicas verificáveis.
2. Centralização do conteúdo em `content/portfolio.ts`.
3. Reconstrução das seções de apresentação, projetos, competências, trajetória e contato.
4. Remoção do backend Django, da API externa, do IoT e do carrossel.
5. Movimentação do projeto Next.js para a raiz do repositório.
6. Inclusão de metadados, dados estruturados, sitemap e robots.
7. Atualização do Next.js e correção das dependências vulneráveis.
8. Auditoria visual em desktop e viewport móvel de 390 × 844 pixels.

## Validação

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd audit --omit=dev
```

Resultados: lint aprovado, build totalmente estático e nenhuma vulnerabilidade
de produção reportada. A inspeção mobile confirmou ausência de overflow
horizontal e carregamento correto das imagens.

## Resultado

O repositório agora contém uma aplicação Next.js independente, sem banco de
dados ou variáveis de ambiente obrigatórias, pronta para deploy padrão no
Vercel.

## Rollback

Para recuperar a arquitetura anterior, consulte o repositório legado
`EzekLobo/Projeto_Portfolio_Dinamico`, que preserva o histórico com os
diretórios `Back/` e `Front/portfolio-front/`.
