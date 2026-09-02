<script setup lang="ts">
const sectionClass = 'w-full py-16 [scroll-margin-top:clamp(4rem,10vh,5rem)]'
</script>

<template>
  <main
    class="flex min-h-screen w-full flex-col items-center pt-[clamp(1vh,10vh,10rem)] text-text"
  >
    <section
      id="sobre"
      :class="sectionClass"
    >
      Sobre (em breve)
    </section>
    <section
      id="experiencia"
      :class="sectionClass"
    >
      Experiência (em breve)
    </section>
    <section
      id="formacao"
      :class="sectionClass"
    >
      Formação (em breve)
    </section>
    <section
      id="historia"
      :class="sectionClass"
    >
      História (em breve)
    </section>
    <section
      id="projetos"
      :class="sectionClass"
    >
      Projetos (em breve)
    </section>
    <section
      id="contato"
      :class="sectionClass"
    >
      Contato (em breve)
    </section>
  </main>
</template>
