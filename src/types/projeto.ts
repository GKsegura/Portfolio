export type ProjetoStatus =
  | 'Em uso ativo'
  | 'Em desenvolvimento'
  | 'Concluído'
  | 'Em evolução'
  | 'Pausado'

export interface ProjetoPeriod {
  start: number
  end?: number
}

export interface Projeto {
  id: number
  title: string
  priority?: number
  featured?: boolean
  githubPrivate?: boolean
  shortDescription?: string
  description: string
  link: string
  image?: string
  languages: string[]
  stack?: string
  period?: ProjetoPeriod
  status?: ProjetoStatus
}
