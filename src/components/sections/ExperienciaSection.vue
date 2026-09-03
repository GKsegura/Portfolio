<script setup lang="ts">
import experienciaData from '@data/experiencia.json'
import type { ExperienciaData } from '@/types/experiencia'
import { formatMonthRange } from '@utils/date'
import {
  REVEAL_HIDDEN,
  REVEAL_TRANSITION,
  REVEAL_VISIBLE,
  useScrollAnimation,
} from '@composables/useScrollAnimation'

const data: ExperienciaData = experienciaData

const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.05 })
</script>

<template>
  <section
    id="experiencia"
    ref="elementRef"
    class="w-full max-w-[1200px] p-8 text-left [scroll-margin-top:clamp(4rem,10vh,5rem)]"
    :class="[REVEAL_TRANSITION, isVisible ? REVEAL_VISIBLE : REVEAL_HIDDEN]"
  >
    <h2 class="mb-8 flex items-baseline gap-2.5 text-3xl font-bold md:text-4xl">
      {{ data.titulo }}
    </h2>
    <ul class="list-none border-l border-surface-border">
      <li
        v-for="(item, i) in data.itens"
        :key="i"
        class="relative pb-8 pl-7 before:absolute before:-left-[5px] before:top-1.5 before:h-2.5 before:w-2.5 before:rounded-full before:bg-primary before:content-[''] last:pb-0"
      >
        <span class="font-mono text-xs uppercase text-secondary">
          {{ formatMonthRange(item.inicio, item.fim) }}
        </span>
        <h3>{{ item.cargo }}</h3>
        <p class="text-sm text-text-muted">
          {{ item.empresa }} · {{ item.local }}
        </p>
      </li>
    </ul>
  </section>
</template>
