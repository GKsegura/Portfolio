export interface EducacaoItem {
  curso: string
  instituicao: string
  inicio: string | null
  fim: string | null
  status: string
  detalhe?: string
}

export interface EducacaoGroup {
  titulo: string
  itens: EducacaoItem[]
}

export interface EducacaoData {
  titulo: string
  academica: EducacaoGroup
  complementares: EducacaoGroup
}
