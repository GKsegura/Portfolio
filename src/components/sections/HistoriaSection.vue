<script setup lang="ts">
import historiaData from '@data/historia.json'
import type { HistoriaData } from '@/types/historia'
import {
  REVEAL_HIDDEN,
  REVEAL_TRANSITION,
  REVEAL_VISIBLE,
  useScrollAnimation,
} from '@composables/useScrollAnimation'

const data: HistoriaData = historiaData

const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.05 })
</script>

<template>
  <section
    id="historia"
    ref="elementRef"
    class="w-full max-w-[1200px] p-8 text-left [scroll-margin-top:clamp(4rem,10vh,5rem)]"
    :class="[REVEAL_TRANSITION, isVisible ? REVEAL_VISIBLE : REVEAL_HIDDEN]"
  >
    <span class="mb-2 inline-block font-mono text-xs uppercase tracking-wider text-secondary">$ cat historia.txt</span>
    <h2 class="mb-6 text-3xl md:text-4xl">
      {{ data.titulo }}
    </h2>

    <div class="flex max-w-[760px] flex-col gap-4">
      <p
        v-for="paragrafo in data.paragrafos"
        :key="paragrafo.id"
        class="text-text-muted text-base leading-[1.8]"
      >
        {{ paragrafo.texto }}
      </p>
    </div>
  </section>
</template>
