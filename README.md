# Finance App

Este projeto é um app bancário simples feito com:
- React + Vite + TypeScript
- Tailwind CSS + CVA
- shadcn/ui + Radix
- React Router
- Zustand
- React Hook Form + Zod
- React Query + Axios
- Vitest

## Funcionalidades
- Login com validação
- Dashboard protegida com saldo simulado
- Transferência com formulário validado e modal de sucesso
- Estado global de autenticação (Zustand)
- Navegação protegida (React Router)
- Teste automatizado (Vitest)

## Scripts
- `npm run dev` — inicia o app em modo desenvolvimento
- `npm run test` ou `npx vitest run --environment jsdom` — executa os testes

## Como rodar
1. Instale as dependências: `npm install`
2. Rode o app: `npm run dev`
3. Rode os testes: `npm run test` ou `npx vitest run --environment jsdom`

## Estrutura
- `src/pages` — Login, Dashboard, Transfer
- `src/store.ts` — Zustand (autenticação)
- `src/api.ts` — React Query + Axios (mock)
- `src/components` — UI (ex: modal de sucesso)
- `tests/` — Testes Vitest

## Segurança

### Engenharia reversa
- O código-fonte do frontend seria ofuscado e minimizado em produção, dificultando a leitura e engenharia reversa.
- Dados sensíveis e regras de negócio críticas nunca ficariam expostos no frontend; toda lógica sensível seria mantida no backend.
- O uso de autenticação baseada em tokens (JWT/OAuth) e validação de permissões seria feito exclusivamente no backend.

### Vazamento de dados
- Dados sensíveis trafegariam apenas por conexões seguras (HTTPS), protegendo contra interceptação.
- Informações confidenciais seriam criptografadas tanto em trânsito quanto em repouso no backend.
- O frontend não armazenaria dados sensíveis em localStorage/sessionStorage; apenas tokens de sessão temporários e protegidos.
- Políticas de acesso, logging e monitoramento seriam implementadas para detectar e mitigar tentativas de vazamento.
- O backend validaria e sanitizaria todas as entradas para evitar ataques como SQL Injection e XSS.

> Este projeto é apenas para fins didáticos e não implementa todas as práticas de segurança citadas acima. Em produção, recomenda-se seguir todas as recomendações para garantir a proteção dos dados e do código.

## Decisões técnicas adotadas
- **Stack:** React + TypeScript + Vite para performance e DX.
- **UI:** Tailwind CSS, shadcn/ui e Radix para componentes modernos e acessíveis.
- **Estado:** Zustand com persistência local (localStorage) para simular autenticação e dados do usuário.
- **Validação:** React Hook Form + Zod para validação robusta de formulários.
- **Roteamento:** React Router com rotas protegidas.
- **Testes:** Vitest + Testing Library cobrindo fluxo de login e transferência.
- **Mock:** Todos os dados são mockados no frontend, sem backend real.

## Melhorias futuras
- Implementar backend real com autenticação JWT e banco de dados.
- Criptografia de dados sensíveis e uso de HTTPS.
- Upload de comprovantes e avatar do usuário.
- Responsividade aprimorada para mobile.
- Mais testes automatizados (integração/end-to-end).
- Internacionalização (i18n).
- Acessibilidade avançada.

## Segurança (simulação)
- Em produção, dados sensíveis seriam criptografados e trafegariam apenas por HTTPS.
- O frontend seria ofuscado/minimizado para dificultar engenharia reversa.
- Autenticação e autorização seriam feitas no backend, nunca apenas no frontend.
- Políticas de acesso, logging e monitoramento seriam implementadas para evitar vazamento de dados.

> Este projeto é apenas para fins didáticos e não deve ser usado em produção sem as devidas adaptações de segurança.
