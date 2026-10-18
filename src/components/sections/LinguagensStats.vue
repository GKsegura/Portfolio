<script setup lang="ts">
import { onMounted, ref } from 'vue'
import linguagensFallback from '@data/linguagens.json'
import type { LinguagensData } from '@/types/linguagens'

const LINGUAGENS_URL = 'https://raw.githubusercontent.com/GKsegura/GKsegura/main/languages.json'

// Cópia embutida no build; o JSON publicado (atualizado toda semana) substitui quando carrega.
const data = ref<LinguagensData>(linguagensFallback)

onMounted(async () => {
  try {
    const res = await fetch(LINGUAGENS_URL)
    if (!res.ok) return
    const remote: LinguagensData = await res.json()
    if (remote.languages?.length) data.value = remote
  } catch {
    // sem rede: mantém a cópia embutida
  }
})
</script>

<template>
  <h3 class="mt-10 mb-4 text-left text-xl text-text-muted md:text-2xl">
    Linguagens mais usadas
  </h3>

  <div
    class="flex h-3 w-full overflow-hidden rounded-full border border-surface-border"
    role="img"
    :aria-label="data.languages.map((l) => `${l.name} ${l.percent}%`).join(', ')"
  >
    <span
      v-for="lang in data.languages"
      :key="lang.name"
      class="h-full"
      :style="{ width: `${lang.percent}%`, backgroundColor: lang.color }"
    />
  </div>

  <ul class="m-0 mt-4 grid list-none grid-cols-2 gap-x-6 gap-y-2 p-0 sm:grid-cols-3 md:grid-cols-4">
    <li
      v-for="lang in data.languages"
      :key="lang.name"
      class="flex items-center gap-2 text-sm text-text-muted"
    >
      <span
        class="inline-block h-2.5 w-2.5 flex-none rounded-full"
        :style="{ backgroundColor: lang.color }"
      />
      <span>{{ lang.name }}</span>
      <span class="font-mono text-xs">{{ lang.percent }}%</span>
    </li>
  </ul>

  <p class="mt-3 text-xs text-text-muted">
    Calculado semanalmente a partir dos meus repositórios no GitHub.
  </p>
</template>
