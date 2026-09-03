<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import type { Projeto } from '@/types/projeto'
import { formatPeriod } from '@utils/date'
import { getStackIcon, getStatusTextClass } from '@utils/project'
import IconGithub from '@components/icons/IconGithub.vue'
import IconTimes from '@components/icons/IconTimes.vue'

defineProps<{ projeto: Projeto }>()

const emit = defineEmits<{ close: [] }>()

const DEFAULT_IMAGE = '/assets/default-project.svg'

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

function handleImageError(e: Event) {
  const img = e.target as HTMLImageElement
  img.src = DEFAULT_IMAGE
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <!--
    Teleport: joga o modal pra fora da árvore do componente, direto pra dentro do <body> -
    equivalente ao ReactDOM.createPortal do original. Necessário pra o modal não ficar preso
    dentro do overflow/z-index da seção de projetos.
  -->
  <Teleport to="body">
    <div
      class="animate-fade-in fixed inset-0 z-[9999] flex items-center justify-center bg-black/[0.78] backdrop-blur-[5px]"
      @click="emit('close')"
    >
      <div
        class="flex max-h-[90vh] w-[90vw] max-w-[860px] flex-col gap-6 overflow-y-auto rounded-[6px] border border-surface-border bg-surface p-7 px-8 backdrop-blur-glass max-[600px]:gap-5 max-[600px]:p-5"
        @click.stop
      >
        <div class="flex items-start justify-between gap-4">
          <h3 class="text-[1.6rem] text-text max-[600px]:text-[1.3rem]">
            {{ projeto.title }}
          </h3>
          <button
            type="button"
            aria-label="Fechar modal"
            class="flex shrink-0 cursor-pointer items-center justify-center rounded-[4px] border-none bg-transparent p-1.5 text-text-muted transition-colors duration-fast hover:translate-y-0 hover:bg-primary/10 hover:text-primary"
            @click="emit('close')"
          >
            <IconTimes :size="18" />
          </button>
        </div>

        <div class="flex flex-wrap gap-8 max-[600px]:flex-col">
          <div class="flex w-[260px] shrink-0 flex-col gap-3.5 max-[600px]:w-full">
            <img
              :src="projeto.image || DEFAULT_IMAGE"
              :alt="projeto.title"
              class="w-full rounded-[4px] border border-surface-border max-[600px]:w-auto max-[600px]:max-w-full max-[600px]:max-h-[200px]"
              @error="handleImageError"
            >

            <div class="flex flex-wrap items-center gap-2.5">
              <small
                v-if="projeto.period"
                class="font-mono text-xs font-semibold text-primary"
              >
                {{ formatPeriod(projeto.period, projeto.status) }}
              </small>
              <span
                v-if="projeto.status"
                :class="getStatusTextClass(projeto.status)"
                class="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap font-mono text-[11px] font-semibold uppercase tracking-wide before:h-1.5 before:w-1.5 before:rounded-full before:bg-current"
              >
                {{ projeto.status }}
              </span>
            </div>

            <ul class="flex flex-wrap gap-x-2.5 gap-y-0 font-mono text-xs">
              <li
                v-for="lang in projeto.languages"
                :key="lang"
                class="text-text-muted [&:not(:last-child)]:after:ml-2.5 [&:not(:last-child)]:after:text-surface-border [&:not(:last-child)]:after:content-['·']"
              >
                {{ lang }}
              </li>
            </ul>
          </div>

          <div class="flex min-w-[220px] flex-1 flex-col gap-4">
            <p class="text-base leading-relaxed text-text-muted">
              <template
                v-for="(line, i) in projeto.description.split('\n')"
                :key="i"
              >
                {{ line }}<br>
              </template>
            </p>

            <span
              v-if="projeto.stack"
              class="inline-flex w-fit items-center gap-1.5 font-mono text-xs font-semibold text-primary"
            >
              <component
                :is="getStackIcon(projeto.stack)"
                :size="12"
              />
              <strong>Stack:</strong> {{ projeto.stack }}
            </span>

            <div class="mt-auto flex">
              <span
                v-if="projeto.githubPrivate"
                aria-disabled="true"
                title="Repositório privado"
                class="inline-flex items-center gap-2.5 rounded border border-transparent px-6 py-3 text-base font-semibold text-text-muted"
              >
                <IconGithub :size="16" /> Repositório privado
              </span>
              <a
                v-else
                :href="projeto.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2.5 rounded border border-transparent bg-primary px-6 py-3 text-base font-semibold text-text-inverted no-underline transition-all duration-normal ease-spring hover:-translate-y-[3px] hover:border-primary hover:bg-primary-hover hover:text-text-inverted active:translate-y-px active:duration-100 active:ease-in"
              >
                <IconGithub :size="16" /> Ver projeto no GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
