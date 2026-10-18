<script setup lang="ts">
import { computed } from 'vue'
import sobreData from '@data/sobre.json'
import type { SobreData } from '@/types/sobre'
import LinguagensStats from '@components/sections/LinguagensStats.vue'
import {
  REVEAL_HIDDEN,
  REVEAL_TRANSITION,
  REVEAL_VISIBLE,
  useScrollAnimation,
} from '@composables/useScrollAnimation'

const data: SobreData = sobreData

const urlTechnologies = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/'

const { elementRef: introRef, isVisible: introVisible } = useScrollAnimation({ threshold: 0.05 })
const { elementRef: techRef, isVisible: techVisible } = useScrollAnimation({ threshold: 0.05 })

const fichaTecnica = computed(() => [
  ...data.intro.fichaTecnica,
  {
    label: 'Stack',
    valor: data.tecnologias.lista.map((tech) => tech.nome).join(' · '),
  },
])

interface TerminalLine {
  type: 'cmd' | 'out'
  text: string
}

const promptLabel = 'visitante@portfolio:~$'
const terminalLines: TerminalLine[] = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: `${data.intro.nome}, dev Full Stack` },
  { type: 'cmd', text: 'cat foco.txt' },
  { type: 'out', text: 'Back-end com Java/Spring, front com Vue 3 e APIs REST' },
]
</script>

<template>
  <section
    id="sobre"
    ref="introRef"
    class="mb-8 w-full max-w-[1200px] p-8 [scroll-margin-top:clamp(4rem,10vh,5rem)]"
    :class="[REVEAL_TRANSITION, introVisible ? REVEAL_VISIBLE : REVEAL_HIDDEN]"
  >
    <div class="relative z-10 flex flex-col items-center gap-10 md:flex-row md:items-start">
      <div class="w-full min-w-0 flex-1 text-center md:text-left">
        <h1 class="mb-4">
          {{ data.intro.nome }}
        </h1>

        <p
          v-if="data.intro.subtitulo"
          class="-mt-1 mb-5 text-base leading-relaxed text-text-muted"
        >
          {{ data.intro.subtitulo }}
        </p>

        <ul class="my-0 mb-6 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2.5 border-y border-surface-border py-4 text-left">
          <li
            v-for="item in fichaTecnica"
            :key="item.label"
            class="col-span-2 grid grid-cols-subgrid items-baseline font-mono text-sm"
          >
            <span
              class="font-semibold tracking-wider text-primary uppercase after:text-secondary after:content-[':']"
            >
              {{ item.label }}
            </span>
            <span class="min-w-0 text-text-muted">{{ item.valor }}</span>
          </li>
        </ul>

        <div
          class="mb-6 text-left text-lg leading-[1.8] [&_a:hover]:text-secondary [&_a]:font-bold [&_a]:text-primary [&_a]:underline [&_p]:mb-3"
        >
          <p
            v-for="paragrafo in data.intro.paragrafos"
            :key="paragrafo.id"
            v-html="paragrafo.texto"
          />
        </div>

        <div class="flex flex-wrap gap-3">
          <a
            :href="data.intro.cta.linkHref"
            class="inline-flex items-center gap-1.5 rounded bg-primary px-6 py-3 text-base font-semibold text-text-inverted no-underline transition-all duration-normal hover:-translate-y-0.5 hover:bg-primary-hover"
          >
            Vamos conversar
          </a>
          <a
            :href="data.intro.curriculo.linkHref"
            download
            class="inline-flex items-center gap-1.5 rounded border border-secondary/45 px-6 py-3 text-base font-semibold text-secondary no-underline transition-all duration-normal hover:border-secondary hover:bg-secondary/10"
          >
            Baixar currículo
          </a>
        </div>
      </div>

      <div class="flex w-full max-w-[360px] flex-none flex-col gap-6 md:mt-4">
        <div
          class="w-full overflow-hidden rounded-small border border-surface-border bg-black/45 shadow-small"
          aria-hidden="true"
        >
          <div class="flex items-center gap-2.5 border-b border-surface-border bg-white/[0.04] px-3 py-2">
            <span class="flex gap-1.5">
              <span class="inline-block h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <span class="inline-block h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span class="inline-block h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            </span>
            <span class="font-mono text-xs text-text-muted">~/portfolio — bash</span>
          </div>

          <div
            class="p-3.5 text-left font-mono text-xs leading-relaxed [&_p]:m-0 [&_p]:break-words [&_p]:whitespace-pre-wrap"
          >
            <template
              v-for="(line, i) in terminalLines"
              :key="i"
            >
              <p v-if="line.type === 'cmd'">
                <span class="text-secondary">{{ promptLabel }}</span> {{ line.text }}
              </p>
              <p
                v-else
                class="text-text-muted"
              >
                &gt; {{ line.text }}
              </p>
            </template>
            <p>
              <span class="text-secondary">{{ promptLabel }}</span>
              <span class="ml-0.5 inline-block h-3 w-1.5 animate-cursor-blink bg-primary align-middle" />
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section
    id="tecnologias"
    ref="techRef"
    class="w-full max-w-[1200px] p-8 text-left [scroll-margin-top:clamp(4rem,10vh,5rem)]"
    :class="[REVEAL_TRANSITION, techVisible ? REVEAL_VISIBLE : REVEAL_HIDDEN]"
  >
    <h2 class="mb-4 flex items-baseline justify-start gap-2.5 text-3xl md:text-4xl">
      {{ data.tecnologias.titulo }}
    </h2>
    <ul class="m-0 flex list-none flex-wrap justify-start gap-8 p-0">
      <li
        v-for="tech in data.tecnologias.lista"
        :key="tech.nome"
        class="flex flex-col items-center justify-center"
      >
        <img
          :src="`${urlTechnologies}${tech.icone}`"
          :alt="tech.nome"
          class="h-[60px] w-[60px] drop-shadow-[0_0_2px_rgba(255,255,255,0.2)] transition-[translate,scale,filter] duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.18] hover:drop-shadow-[0_0_10px_rgba(169,112,255,0.55)]"
        >
        <span class="mt-1.5 text-center text-xs text-text-muted">{{ tech.nome }}</span>
      </li>
    </ul>

    <h3 class="mt-10 mb-4 text-left text-xl text-text-muted md:text-2xl">
      {{ data.tecnologias.outras.titulo }}
    </h3>
    <ul class="m-0 flex list-none flex-wrap justify-start gap-6 p-0">
      <li
        v-for="tech in data.tecnologias.outras.lista"
        :key="tech.nome"
        class="flex flex-col items-center justify-center"
      >
        <img
          :src="`${urlTechnologies}${tech.icone}`"
          :alt="tech.nome"
          class="h-[44px] w-[44px] opacity-80 drop-shadow-[0_0_2px_rgba(255,255,255,0.2)] transition-[translate,scale,filter,opacity] duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.18] hover:opacity-100 hover:drop-shadow-[0_0_10px_rgba(169,112,255,0.55)]"
        >
        <span class="mt-1.5 text-center text-xs text-text-muted">{{ tech.nome }}</span>
      </li>
    </ul>

    <LinguagensStats />
  </section>
</template>
