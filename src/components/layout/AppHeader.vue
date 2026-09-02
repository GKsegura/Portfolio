<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

interface NavLink {
  href: string
  label: string
  id: string
}

const NAV_LINKS: NavLink[] = [
  { href: '#sobre', label: 'Sobre', id: 'sobre' },
  { href: '#experiencia', label: 'Experiência', id: 'experiencia' },
  { href: '#formacao', label: 'Formação', id: 'formacao' },
  { href: '#historia', label: 'História', id: 'historia' },
  { href: '#projetos', label: 'Projetos', id: 'projetos' },
  { href: '#contato', label: 'Contato', id: 'contato' },
]

const SECTION_TO_NAV: Record<string, string> = {
  sobre: 'sobre',
  tecnologias: 'sobre',
  experiencia: 'experiencia',
  formacao: 'formacao',
  historia: 'historia',
  projetos: 'projetos',
  contato: 'contato',
}

const isOpen = ref(false)
const activeSection = ref('sobre')

function toggleMenu(e: MouseEvent) {
  e.stopPropagation()
  isOpen.value = !isOpen.value
}

function handleNavClick() {
  isOpen.value = false
}

function handleClickOutside(e: MouseEvent) {
  if (!isOpen.value) return
  const target = e.target as HTMLElement
  if (!target.closest('header')) isOpen.value = false
}

function handleResize() {
  if (window.innerWidth > 768) isOpen.value = false
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', handleResize)

  const sections = document.querySelectorAll('section[id]')
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const navId = SECTION_TO_NAV[entry.target.id]
          if (navId) activeSection.value = navId
        }
      })
    },
    { threshold: 0.35 },
  )
  sections.forEach((section) => observer?.observe(section))
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', handleResize)
  observer?.disconnect()
})
</script>

<template>
  <header
    class="fixed top-0 left-0 z-[1000] flex w-full items-center justify-between overflow-hidden border-b border-surface-border bg-surface px-[clamp(1rem,5vw,2rem)] py-4 text-text backdrop-blur-glass transition-colors duration-normal hover:border-primary/50 max-md:flex-wrap max-md:px-6 max-md:py-4"
  >
    <div class="relative z-[2] shrink-0 font-display text-lg font-bold tracking-wide text-text">
      &lt;/&gt; José Segura<span class="text-secondary">.</span>
    </div>

    <button
      type="button"
      class="relative z-[1001] hidden h-8 w-8 shrink-0 flex-col justify-center gap-[5px] rounded p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 max-md:flex"
      :aria-label="isOpen ? 'Fechar menu' : 'Abrir menu'"
      :aria-expanded="isOpen"
      @click="toggleMenu"
    >
      <span
        class="block h-0.5 w-[22px] origin-center rounded-full bg-primary transition-transform duration-normal"
        :class="isOpen ? 'translate-y-[7px] rotate-45' : ''"
      />
      <span
        class="block h-0.5 w-[22px] origin-center rounded-full bg-primary transition-all duration-normal"
        :class="isOpen ? 'scale-x-0 opacity-0' : ''"
      />
      <span
        class="block h-0.5 w-[22px] origin-center rounded-full bg-primary transition-transform duration-normal"
        :class="isOpen ? '-translate-y-[7px] -rotate-45' : ''"
      />
    </button>

    <nav
      class="relative z-[2] flex gap-6 max-md:mt-3 max-md:w-full max-md:flex-col max-md:gap-0 max-md:border-t max-md:border-surface-border max-md:pt-1 max-md:pb-2"
      :class="isOpen ? 'max-md:flex' : 'max-md:hidden'"
    >
      <a
        v-for="{ href, label, id } in NAV_LINKS"
        :key="id"
        :href="href"
        class="relative text-[0.92rem] font-semibold text-text-muted no-underline transition-colors duration-normal after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-normal after:content-[''] hover:text-primary hover:after:scale-x-100 focus:underline focus:outline-none max-md:border-b max-md:border-surface-border max-md:px-1 max-md:py-3 max-md:text-[1.05rem] max-md:after:hidden max-md:last:border-b-0"
        :class="activeSection === id ? 'text-primary after:scale-x-100' : ''"
        @click="handleNavClick"
      >
        {{ label }}
      </a>
    </nav>
  </header>
</template>
