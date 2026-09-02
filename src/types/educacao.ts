export interface EducacaoItem {
  curso: string
  instituicao: string
  inicio: string | null
  fim: string | null
  status: string
  detalhe?: string
}

export interface EducacaoData {
  titulo: string
  itens: EducacaoItem[]
}
