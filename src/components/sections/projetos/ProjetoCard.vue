<script setup lang="ts">
import type { Projeto } from '@/types/projeto'
import { formatPeriod } from '@utils/date'
import { getStackIcon, getStatusTextClass } from '@utils/project'
import IconGithub from '@components/icons/IconGithub.vue'
import {
  REVEAL_HIDDEN,
  REVEAL_TRANSITION,
  REVEAL_VISIBLE,
  useScrollAnimation,
} from '@composables/useScrollAnimation'

withDefaults(
  defineProps<{ projeto: Projeto; featured?: boolean; animationDelay?: number }>(),
  { featured: false, animationDelay: 0 },
)

const emit = defineEmits<{ 'ver-mais': [] }>()

const DEFAULT_IMAGE = '/assets/default-project.svg'

const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.08 })

function handleImageError(e: Event) {
  const img = e.target as HTMLImageElement
  img.src = DEFAULT_IMAGE
}
</script>

<template>
  <article
    ref="elementRef"
    role="button"
    tabindex="0"
    :style="{ transitionDelay: `${animationDelay}ms` }"
    :class="[
      REVEAL_TRANSITION,
      isVisible ? REVEAL_VISIBLE : REVEAL_HIDDEN,
      featured ? 'border-primary/40' : 'border-surface-border',
    ]"
    class="group relative z-0 flex w-full cursor-pointer items-start gap-6 overflow-hidden rounded-[6px] border bg-surface bg-linear-to-b from-primary/8 to-transparent to-45% p-6 text-left transition-colors duration-normal hover:border-primary hover:bg-surface-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 max-sm:flex-col max-sm:p-5"
    @click="emit('ver-mais')"
    @keydown.enter="emit('ver-mais')"
    @keydown.space.prevent="emit('ver-mais')"
  >
    <div
      class="aspect-[4/3] w-[180px] shrink-0 overflow-hidden rounded-[4px] border border-surface-border bg-white/[0.03] transition-colors duration-normal group-hover:border-primary/35 max-sm:w-full"
    >
      <img
        :src="projeto.image || DEFAULT_IMAGE"
        :alt="projeto.title"
        class="h-full w-full object-cover object-top transition-transform duration-slow ease-out group-hover:scale-[1.07]"
        @error="handleImageError"
      >
    </div>

    <div class="flex min-w-0 flex-1 flex-col gap-2.5">
      <span
        v-if="featured"
        class="w-fit border-l-2 border-primary pl-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-primary"
      >
        Projeto em destaque
      </span>

      <div class="flex items-start justify-between gap-4 max-sm:flex-col">
        <h3
          class="leading-[1.1] text-text transition-colors duration-normal group-hover:text-primary"
          :class="featured ? 'text-[1.6rem]' : 'text-[1.4rem]'"
        >
          {{ projeto.title }}
        </h3>
        <span
          v-if="projeto.status"
          :class="getStatusTextClass(projeto.status)"
          class="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap font-mono text-[11px] font-semibold uppercase tracking-wide before:h-1.5 before:w-1.5 before:rounded-full before:bg-current"
        >
          {{ projeto.status }}
        </span>
      </div>

      <small
        v-if="projeto.period"
        class="font-mono text-xs font-semibold text-primary"
      >
        {{ formatPeriod(projeto.period, projeto.status) }}
      </small>

      <p
        v-if="projeto.shortDescription"
        class="text-sm leading-relaxed text-text-muted"
      >
        {{ projeto.shortDescription }}
      </p>

      <ul class="flex flex-wrap gap-x-2.5 gap-y-0 font-mono text-xs">
        <li
          v-for="lang in projeto.languages"
          :key="lang"
          class="text-text-muted [&:not(:last-child)]:after:ml-2.5 [&:not(:last-child)]:after:text-surface-border [&:not(:last-child)]:after:content-['·']"
        >
          {{ lang }}
        </li>
      </ul>

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

      <div class="mt-1 flex gap-3">
        <span
          v-if="projeto.githubPrivate"
          aria-disabled="true"
          title="Repositório privado"
          class="inline-flex items-center justify-center gap-1.5 rounded border border-surface-border px-4 py-2.5 text-sm font-semibold text-text-muted"
        >
          <IconGithub :size="14" /> Repositório privado
        </span>
        <a
          v-else
          :href="projeto.link"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`Abrir ${projeto.title} no GitHub`"
          class="inline-flex items-center justify-center gap-1.5 rounded border border-surface-border px-4 py-2.5 text-sm font-semibold text-text-muted transition-colors duration-normal hover:border-primary hover:bg-primary/[0.06] hover:text-primary"
          @click.stop
        >
          <IconGithub :size="14" /> GitHub
        </a>

        <button
          type="button"
          class="rounded border border-transparent bg-primary px-5 py-2.5 text-sm font-bold text-text transition-all duration-normal ease-spring hover:-translate-y-[3px] hover:border-primary hover:bg-primary-hover active:translate-y-px active:duration-100 active:ease-in"
          @click.stop="emit('ver-mais')"
        >
          Ver detalhes
        </button>
      </div>
    </div>
  </article>
</template>
