export interface LinguagemItem {
  name: string
  bytes: number
  percent: number
  color: string
}

export interface LinguagensData {
  owner: string
  languages: LinguagemItem[]
}
