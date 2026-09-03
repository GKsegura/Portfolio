<script setup lang="ts">
import educacaoData from '@data/educacao.json'
import type { EducacaoData } from '@/types/educacao'
import { formatMonthRange } from '@utils/date'
import {
  REVEAL_HIDDEN,
  REVEAL_TRANSITION,
  REVEAL_VISIBLE,
  useScrollAnimation,
} from '@composables/useScrollAnimation'

const data: EducacaoData = educacaoData

const groups = [
  { ...data.academica, monthly: true as const },
  { ...data.complementares, monthly: false as const },
]

const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.05 })
</script>

<template>
  <section
    id="formacao"
    ref="elementRef"
    class="w-full max-w-[1200px] p-8 text-left [scroll-margin-top:clamp(4rem,10vh,5rem)]"
    :class="[REVEAL_TRANSITION, isVisible ? REVEAL_VISIBLE : REVEAL_HIDDEN]"
  >
    <h2 class="mb-8 text-3xl font-bold">
      {{ data.titulo }}
    </h2>

    <div
      v-for="group in groups"
      :key="group.titulo"
      class="mb-10 last:mb-0"
    >
      <span class="mb-4 block font-mono text-xs uppercase tracking-wider text-secondary">
        {{ group.titulo }}
      </span>

      <ul class="relative ml-2 space-y-8 border-l border-surface-border pl-8">
        <li
          v-for="(item, i) in group.itens"
          :key="`${item.curso}-${i}`"
          class="relative min-w-0"
        >
          <span
            class="absolute -left-[calc(2rem+6px)] top-1.5 h-2.5 w-2.5 rounded-full bg-secondary"
            aria-hidden="true"
          />
          <div class="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm opacity-75">
            <span v-if="item.inicio">
              {{ group.monthly ? formatMonthRange(item.inicio, item.fim) : `${item.inicio} - ${item.fim}` }}
            </span>
            <span
              class="relative pl-4 before:absolute before:left-0 before:top-1/2 before:h-2 before:w-2 before:-translate-y-1/2 before:rounded-full before:bg-current"
            >
              {{ item.status }}
            </span>
          </div>
          <h3 class="break-words text-xl font-semibold">
            {{ item.curso }}
          </h3>
          <p class="mt-1 break-words">
            {{ item.instituicao }}
          </p>
          <p
            v-if="item.detalhe"
            class="mt-2 break-words font-mono text-xs opacity-75"
          >
            {{ item.detalhe }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>
