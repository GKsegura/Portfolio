export interface ExperienciaItem {
  cargo: string
  empresa: string
  local: string
  inicio: string | null
  fim: string | null
}

export interface ExperienciaData {
  titulo: string
  itens: ExperienciaItem[]
}
