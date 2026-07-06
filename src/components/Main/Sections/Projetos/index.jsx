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

    return (
        <section ref={sectionRef} className={`${styles.projetos} reveal`} id="projetos">
            <div className={styles.header}>
                <h2>Projetos</h2>
                <p>
                    Alguns projetos que representam minha evolução em front-end, back-end,
                    APIs, automações e produtos digitais.
                </p>
            </div>

            <div className={styles.projetosList}>
                {sortedProjetos.map((projeto, index) => (
                    <ProjetoCard
                        key={projeto.id}
                        projeto={projeto}
                        onVerMais={() => setSelectedProjeto(projeto)}
                        animationDelay={index * 80}
                        featured={projeto.featured}
                    />
                ))}
            </div>

            {selectedProjeto && (
                <Modal
                    projeto={selectedProjeto}
                    onClose={() => setSelectedProjeto(null)}
                />
            )}
        </section>
    )
}

export default Projetos
