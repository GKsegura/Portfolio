import type { ProjetoPeriod, ProjetoStatus } from '@/types/projeto'

export function formatPeriod(period: ProjetoPeriod | undefined, status: ProjetoStatus | undefined): string | null {
  if (!period?.start) return null

  if (status === 'Concluído' && period.end) {
    return `Período: ${period.start} - ${period.end}`
  }

  return `Em andamento desde ${period.start}`
}

const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

function formatMonthYear(value: string | null): string | null {
  if (!value) return null

  const [year, month] = value.split('-')
  return `${MESES[Number(month) - 1]} ${year}`
}

export function formatMonthRange(inicio: string | null, fim: string | null): string {
  const inicioLabel = formatMonthYear(inicio)
  if (!inicioLabel) return ''

  return `${inicioLabel} - ${fim ? formatMonthYear(fim) : 'Atual'}`
}
