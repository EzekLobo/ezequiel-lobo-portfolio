# Portfólio — Ezequiel Lobo Oliveira

Portfólio de desenvolvedor de software em início de carreira. Cada projeto é
apresentado como um case curto: problema, contribuição individual, evidências
técnicas, tecnologias e links verificáveis.

## Para recrutadores

- [InventoryRFID](https://github.com/EzekLobo/inventory-rfid): protótipo web de inventário patrimonial com API Django REST, frontend Next.js, integração RFID, auditorias e histórico operacional.
- [AulaPay](https://github.com/EzekLobo/professor-pay-app): aplicativo React Native para acompanhamento de aulas e pagamentos, com persistência SQLite e testes com Vitest.
- [Go distribuído 9×9](https://github.com/EzekLobo/Sistemas_Distribuidos-UESC): aplicação Python com XML-RPC, concorrência e testes unitários para regras de um jogo distribuído.

O currículo atualizado está disponível pelo botão **Baixar CV** na página.

## Tecnologias

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

## Executar localmente

```powershell
npm.cmd install
npm.cmd run dev
```

A aplicação estará disponível em `http://localhost:3000`.

## Verificações

```powershell
npm.cmd run lint
npm.cmd run build
```

## Atualizar conteúdo

As informações de perfil e os cases de projetos estão centralizados em
`content/portfolio.ts`. Imagens ficam em `public/profile` e `public/projects`.

## Publicação

Conecte este repositório ao Vercel mantendo as configurações padrão para
Next.js. Não há banco de dados, API externa ou variáveis de ambiente
obrigatórias.
