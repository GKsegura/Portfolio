import Contato from '@components/Main/Sections/Contato'
import Experiencia from '@components/Main/Sections/Experiencia'
import Formacao from '@components/Main/Sections/Formacao'
import Projetos from '@components/Main/Sections/Projetos'
import Sobre from '@components/Main/Sections/Sobre'
import styles from './Main.module.css'

export default function Main() {
    return (
        <main className={styles.main}>
            <Sobre />
            <Experiencia />
            <Formacao />
            <Projetos />
            <Contato />
        </main>
    )
}