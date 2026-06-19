import languages from '@data/languages.json'
import projetosData from '@data/projetos.json'
import { useScrollAnimation } from '@hooks/useScrollAnimation'
import { sortProjetos } from '@utils/project'
import { useState } from 'react'
import Modal from './Modal'
import ProjetoCard from './ProjetoCard'
import styles from './Projetos.module.css'

const Projetos = () => {
    const [selectedProjeto, setSelectedProjeto] = useState(null)
    const sectionRef = useScrollAnimation({ threshold: 0.05 })

    const sortedProjetos = sortProjetos(projetosData)

    const featuredProjetos = sortedProjetos.filter((projeto) => projeto.featured)
    const otherProjetos = sortedProjetos.filter((projeto) => !projeto.featured)

    return (
        <section ref={sectionRef} className={`${styles.projetos} reveal`} id="projetos">
            <div className={styles.header}>
                <span className={styles.subtitle}>Meus principais trabalhos</span>
                <h2>Projetos</h2>
                <p>
                    Alguns projetos que representam minha evolução em front-end, back-end,
                    APIs, automações e produtos digitais.
                </p>
            </div>

            {featuredProjetos.length > 0 && (
                <div className={styles.featuredGrid}>
                    {featuredProjetos.map((projeto, index) => (
                        <ProjetoCard
                            key={projeto.id}
                            projeto={projeto}
                            onVerMais={() => setSelectedProjeto(projeto)}
                            animationDelay={index * 120}
                            featured
                        />
                    ))}
                </div>
            )}

            <div className={styles.projetosContainer}>
                {otherProjetos.map((projeto, index) => (
                    <ProjetoCard
                        key={projeto.id}
                        projeto={projeto}
                        onVerMais={() => setSelectedProjeto(projeto)}
                        animationDelay={index * 120}
                    />
                ))}
            </div>

            {selectedProjeto && (
                <Modal
                    projeto={selectedProjeto}
                    onClose={() => setSelectedProjeto(null)}
                    languages={languages}
                />
            )}
        </section>
    )
}

export default Projetos