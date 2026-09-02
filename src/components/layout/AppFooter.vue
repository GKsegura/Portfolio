<script setup lang="ts">
import IconGithub from '@components/icons/IconGithub.vue'
import IconEnvelope from '@components/icons/IconEnvelope.vue'
import IconLinkedin from '@components/icons/IconLinkedin.vue'
import IconInstagram from '@components/icons/IconInstagram.vue'

const linkClass =
  'flex items-center gap-1 text-sm font-semibold text-primary transition-colors duration-normal hover:text-secondary'
</script>

<template>
  <footer
    class="mt-auto flex w-full flex-col items-center gap-4 border-t border-surface-border p-6 text-center text-sm text-text-muted sm:p-8"
  >
    <p>Desenvolvido por <strong>José Segura</strong> • © {{ new Date().getFullYear() }}</p>
    <p>
      Projeto desenvolvido utilizando <strong>Vue 3</strong> com <strong>TypeScript</strong> e
      <strong>Tailwind CSS</strong>, via <strong>Vite</strong>.
    </p>

    <div class="flex flex-wrap justify-center gap-6 max-[500px]:flex-col max-[500px]:items-center">
      <a
        href="https://github.com/GKsegura"
        target="_blank"
        rel="noopener noreferrer"
        :class="linkClass"
      >
        <IconGithub :size="19" /> GitHub
      </a>
      <a
        href="mailto:jose.segura.ms@gmail.com"
        :class="linkClass"
      >
        <IconEnvelope :size="19" /> Contato
      </a>
      <a
        href="https://www.linkedin.com/in/jose-a-segura-m-da-silva/"
        target="_blank"
        rel="noopener noreferrer"
        :class="linkClass"
      >
        <IconLinkedin :size="19" /> LinkedIn
      </a>
      <a
        href="https://www.instagram.com/_jose.segura/"
        target="_blank"
        rel="noopener noreferrer"
        :class="linkClass"
      >
        <IconInstagram :size="19" /> Instagram
      </a>
    </div>
  </footer>
</template>
