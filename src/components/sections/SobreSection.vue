<script setup lang="ts">
import { computed } from 'vue'
import sobreData from '@data/sobre.json'
import type { SobreData } from '@/types/sobre'
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
        <h1>Olá, eu sou o <span class="font-bold text-primary">{{ data.intro.nome }}</span></h1>

        <p
          v-if="data.intro.subtitulo"
          class="-mt-1 mb-5 text-base leading-relaxed text-text-muted"
        >
          {{ data.intro.subtitulo }}
        </p>

        <ul class="my-0 mb-6 flex flex-col gap-2.5 border-y border-surface-border py-4 text-left">
          <li
            v-for="item in fichaTecnica"
            :key="item.label"
            class="flex flex-wrap items-baseline gap-2.5 font-mono text-sm"
          >
            <span
              class="min-w-[5.5rem] shrink-0 font-semibold tracking-wider text-primary uppercase after:text-secondary after:content-[':']"
            >
              {{ item.label }}
            </span>
            <span class="text-text-muted">{{ item.valor }}</span>
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

      <div class="flex w-full max-w-[320px] flex-none flex-col gap-6">
        <div
          class="relative z-0 aspect-[4/5] w-full overflow-hidden rounded-small border border-surface-border transition-transform duration-normal hover:-translate-y-1"
        >
          <img
            src="https://github.com/GKsegura.png"
            alt="Foto de perfil do José Segura"
            class="relative z-0 h-full w-full object-cover"
          >
        </div>

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
  </section>
</template>
