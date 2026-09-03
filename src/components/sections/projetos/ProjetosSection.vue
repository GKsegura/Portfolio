<script setup lang="ts">
import { computed, ref } from 'vue'
import projetosData from '@data/projetos.json'
import type { Projeto } from '@/types/projeto'
import { sortProjetos } from '@utils/project'
import {
  REVEAL_HIDDEN,
  REVEAL_TRANSITION,
  REVEAL_VISIBLE,
  useScrollAnimation,
} from '@composables/useScrollAnimation'
import ProjetoCard from './ProjetoCard.vue'
import ProjetoModal from './ProjetoModal.vue'

// campos como "status" vêm do JSON tipados como string genérica (não como o union
// ProjetoStatus), então uma anotação simples não é atribuível - precisa de cast aqui
const data = projetosData as Projeto[]

const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.05 })

const sortedProjetos = computed(() => sortProjetos(data))

const selectedProjeto = ref<Projeto | null>(null)
</script>

<template>
  <section
    id="projetos"
    ref="elementRef"
    class="w-full max-w-[1200px] p-8 text-left [scroll-margin-top:clamp(4rem,10vh,5rem)]"
    :class="[REVEAL_TRANSITION, isVisible ? REVEAL_VISIBLE : REVEAL_HIDDEN]"
  >
    <div class="mb-10 max-w-[720px]">
      <h2 class="mb-3 text-3xl md:text-4xl">
        Projetos
      </h2>
      <p class="text-text-muted leading-[1.7]">
        Alguns projetos que representam minha evolução em front-end, back-end,
        APIs, automações e produtos digitais.
      </p>
    </div>

    <div class="flex flex-col gap-5 max-md:gap-4">
      <ProjetoCard
        v-for="(projeto, index) in sortedProjetos"
        :key="projeto.id"
        :projeto="projeto"
        :featured="projeto.featured"
        :animation-delay="index * 80"
        @ver-mais="selectedProjeto = projeto"
      />
    </div>

    <ProjetoModal
      v-if="selectedProjeto"
      :projeto="selectedProjeto"
      @close="selectedProjeto = null"
    />
  </section>
</template>
