export interface HistoriaParagrafo {
  id: number
  texto: string
}

export interface HistoriaData {
  titulo: string
  paragrafos: HistoriaParagrafo[]
}
