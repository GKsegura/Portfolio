import type { Component } from 'vue'
import IconGlobe from '@components/icons/IconGlobe.vue'
import IconLaptopCode from '@components/icons/IconLaptopCode.vue'
import IconServer from '@components/icons/IconServer.vue'
import IconBoxOpen from '@components/icons/IconBoxOpen.vue'
import type { Projeto, ProjetoStatus } from '@/types/projeto'

const statusPriority: Record<ProjetoStatus, number> = {
  'Em uso ativo': 1,
  'Em desenvolvimento': 2,
  'Concluído': 3,
  'Em evolução': 4,
  'Pausado': 5,
}

function getRelevantYear(projeto: Projeto): number | undefined {
  if (projeto.status === 'Concluído') {
    return projeto.period?.end ?? projeto.period?.start
  }

  return projeto.period?.start
}

export function sortProjetos(projetos: Projeto[]): Projeto[] {
  return [...projetos].sort((a, b) => {
    // prioridade manual (hierarquia definida do portfólio)
    const priorityA = a.priority ?? Infinity
    const priorityB = b.priority ?? Infinity

    if (priorityA !== priorityB) return priorityA - priorityB

    // prioridade por status
    const statusA = a.status ? statusPriority[a.status] : Infinity
    const statusB = b.status ? statusPriority[b.status] : Infinity
    const statusDiff = statusA - statusB

    if (statusDiff !== 0) return statusDiff

    // ano mais recente primeiro
    const yearA = getRelevantYear(a) ?? 0
    const yearB = getRelevantYear(b) ?? 0

    if (yearB !== yearA) return yearB - yearA

    // fallback alfabético
    return a.title.localeCompare(b.title)
  })
}

export function getStackIcon(stack?: string): Component {
  switch (stack?.toLowerCase()) {
    case 'full stack':
      return IconGlobe
    case 'front-end':
      return IconLaptopCode
    case 'back-end':
      return IconServer
    default:
      return IconBoxOpen
  }
}

// Tailwind não detecta classes montadas em runtime (styles[status] do CSS Modules original) -
// precisa de um mapa com as strings completas visíveis no código.
const STATUS_TEXT_CLASS: Record<ProjetoStatus, string> = {
  'Concluído': 'text-[#40d982]',
  'Em desenvolvimento': 'text-[#ffc057]',
  'Pausado': 'text-[#ff6b8a]',
  'Em uso ativo': 'text-[#40d982]',
  'Em evolução': 'text-[#9da0ff]',
}

export function getStatusTextClass(status: ProjetoStatus): string {
  return STATUS_TEXT_CLASS[status]
}
