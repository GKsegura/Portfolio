# Migração do Portfólio: React → Vue 3

## Contexto

José foi confirmado para a vaga de Desenvolvedor Júnior no time NxCoop (Nexum Tecnologia), stack Java Spring Boot + Vue 3 + MySQL, assumindo de fato após as férias (30/11 a 18/12/2026). A ideia é migrar o próprio portfólio de React para Vue 3 para chegar com prática real na tecnologia, não só teoria — em vez de simplesmente listar Vue como skill estudada. Ritmo de trabalho: ~1h/dia.

## Estratégia

- Branch nova: `feat/migracao-vue`, para manter `master` intacto/deployável até a migração estar validada.
- Migração incremental, componente por componente. Os `.jsx` antigos só saem depois que o `.vue` equivalente estiver validado visualmente.
- Reaproveitar ao máximo o que já é framework-agnostic: JSON de conteúdo (`src/data/*.json`), utils puros (`src/utils/project.js`, `src/utils/date.js`), e os arquivos `*.module.css` (só muda a sintaxe de binding no template, o CSS em si não muda).

## Decisões já tomadas

- **Ícones**: hoje é `react-icons/fa` (10 ícones únicos: Github, Envelope, Linkedin, Instagram, Whatsapp, Times, Globe, LaptopCode, Server, BoxOpen). Em vez de puxar uma lib de ícones pra Vue, criar componentes SVG inline próprios — conjunto pequeno e fixo, não vale a dependência nova.
- **CSS Modules**: mantidos como arquivos `.module.css` externos, importados normalmente (`import styles from './X.module.css'`) — Vite trata CSS Modules de forma agnóstica a framework. Só troca `className={styles.x}` (React) por `:class="styles.x"` (Vue) no template.
- **Modal**: `ReactDOM.createPortal` vira `<Teleport to="body">`.

## Fases de implementação

| Fase | O quê | Horas |
|---|---|---|
| 0 | Setup: trocar `@vitejs/plugin-react`→`@vitejs/plugin-vue` em `vite.config.js` (aliases continuam iguais), `eslint-plugin-react-*`→`eslint-plugin-vue`, decisão de ícones | 1-2h |
| 1 | Casca: `main.jsx`→`main.js` (`createApp(App).mount('#root')`), `App.jsx`→`App.vue`, `index.html` aponta pro novo entrypoint | 0.5-1h |
| 2 | Composable `useScrollAnimation` (useEffect/useRef → onMounted/onUnmounted/ref); `utils/*.js` não mudam | 1-2h |
| 3 | Componentes simples primeiro: `Footer`, `Contato`, `Experiencia`, `Formacao`, `Historia` | 4-6h |
| 4 | `Sobre.vue` (duas seções: intro + tecnologias; `dangerouslySetInnerHTML` → `v-html`) | 1-2h |
| 5 | `Projetos` + `ProjetoCard` + `Modal` (Teleport, Escape key, lock de scroll) — a mais trabalhosa | 3-5h |
| 6 | `Header.vue` (hambúrguer, clique-fora, resize, `IntersectionObserver` pra nav ativa) — mais lógica de JS | 2-4h |
| 8 | Cleanup: remover deps React do `package.json`, apagar `.jsx` antigos, atualizar texto do `Footer` ("React"→"Vue") e o card "Portfólio" em `projetos.json` (hoje descreve a si mesmo como React/CSS Modules) | 1h |
| — | Verificação: `npm run dev` (todas as seções, menu mobile, modal, animações de reveal) + `npm run build` + `npm run lint` | 2-3h |

**Total estimado: ~25-35h de implementação.**

## Estudo prévio de Vue 3

- Foco em Composition API + `<script setup>` (estilo moderno, provável padrão usado na NxCoop).
- Tutorial interativo oficial (vuejs.org/tutorial) + guia de Composition API: ~8-12h.
- Vindo de React, os conceitos de componentes/reatividade/lifecycle já transferem — a curva é mais de sintaxe do que de modelo mental.

**Total geral: ~35-45h (estudo + implementação).**

## Estimativa de calendário

A 1h/dia: ~5-7 semanas corridas. Cabe com folga antes das férias de 30/11/2026 (~14 semanas de prazo a partir de 22/08/2026).

## Notas

- Não há workflow de CI (`.github/workflows` vazio) — deploy parece ser manual via `gh-pages` a partir de `dist/`. A migração não deve afetar isso, mas vale confirmar o deploy funcionando no fim.
- Ordem sugerida: um pouco de tutorial isolado primeiro, depois já começar pela Fase 0-3 — os componentes simples da Fase 3 funcionam como extensão prática do estudo.
