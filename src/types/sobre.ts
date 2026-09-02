export interface FichaTecnicaItem {
  label: string
  valor: string
}

export interface SobreParagrafo {
  id: number
  /** Contém HTML bruto, renderizado via v-html */
  texto: string
}

export interface SobreIntro {
  nome: string
  titulo: string
  subtitulo?: string
  fichaTecnica: FichaTecnicaItem[]
  paragrafos: SobreParagrafo[]
  cta: { linkHref: string }
  curriculo: { linkHref: string }
}

export interface TecnologiaItem {
  nome: string
  icone: string
}

export interface SobreData {
  intro: SobreIntro
  tecnologias: {
    titulo: string
    lista: TecnologiaItem[]
  }
}
