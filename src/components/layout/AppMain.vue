<script setup lang="ts">
import SobreSection from '@components/sections/SobreSection.vue'
import ExperienciaSection from '@components/sections/ExperienciaSection.vue'
import FormacaoSection from '@components/sections/FormacaoSection.vue'
import HistoriaSection from '@components/sections/HistoriaSection.vue'
import ProjetosSection from '@components/sections/projetos/ProjetosSection.vue'
import ContatoSection from '@components/sections/ContatoSection.vue'
</script>

<template>
  <main
    class="flex min-h-screen w-full flex-col items-center pt-[clamp(1vh,10vh,10rem)] text-text"
  >
    <SobreSection />
    <ExperienciaSection />
    <FormacaoSection />
    <HistoriaSection />
    <ProjetosSection />
    <ContatoSection />
  </main>
</template>
