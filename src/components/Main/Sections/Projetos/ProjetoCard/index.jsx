import { useScrollAnimation } from '@hooks/useScrollAnimation'
import { formatPeriod } from '@utils/date'
import { getStackEmoji, slugify } from '@utils/project'
import { FaGithub } from 'react-icons/fa'
import styles from './ProjetoCard.module.css'

const DEFAULT_IMAGE = '/assets/default-project.svg'

const ProjetoCard = ({ projeto, numero, onVerMais, animationDelay = 0, featured = false }) => {
    const cardRef = useScrollAnimation({ threshold: 0.08 })

    const statusClass = projeto.status
        ? projeto.status.toLowerCase().replace(/\s/g, '')
        : ''

    return (
        <article
            ref={cardRef}
            className={`${styles.projeto} ${featured ? styles.featured : ''} reveal`}
            style={{ transitionDelay: `${animationDelay}ms` }}
            onClick={onVerMais}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onVerMais()
            }}
            aria-label={`Ver detalhes do projeto ${projeto.title}`}
        >
            {numero && (
                <span className={styles.ghostNumber} aria-hidden="true">
                    {String(numero).padStart(2, '0')}
                </span>
            )}

            <div className={styles.thumb}>
                <img
                    src={projeto.image || DEFAULT_IMAGE}
                    alt={projeto.title}
                    className={styles.projetoImage}
                    onError={(e) => { e.target.src = DEFAULT_IMAGE }}
                />
            </div>

            <div className={styles.body}>
                <div className={styles.metaRow}>
                    {featured && (
                        <span className={styles.featuredLabel}>Projeto em destaque</span>
                    )}
                    <span className={styles.endpoint}>GET /projetos/{slugify(projeto.title)}</span>
                </div>

                <div className={styles.top}>
                    <h3>{projeto.title}</h3>

                    {projeto.status && (
                        <span className={`${styles.status} ${styles[statusClass]}`}>
                            {projeto.status}
                        </span>
                    )}
                </div>

                {projeto.period && (
                    <small className={styles.year}>
                        {formatPeriod(projeto.period, projeto.status)}
                    </small>
                )}

                {projeto.shortDescription && (
                    <p className={styles.shortDescription}>
                        {projeto.shortDescription}
                    </p>
                )}

                <ul className={styles.languages}>
                    {projeto.languages.map((tec, index) => (
                        <li key={index}>{tec}</li>
                    ))}
                </ul>

                {projeto.stack && (
                    <span className={styles.stack}>
                        <strong>{getStackEmoji(projeto.stack)} Stack:</strong> {projeto.stack}
                    </span>
                )}

                <div className={styles.linkContainer}>
                    <a
                        href={projeto.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Abrir ${projeto.title} no GitHub`}
                    >
                        <FaGithub size={14} />
                        GitHub
                    </a>

                    <button
                        className={styles.verMaisButton}
                        onClick={(e) => {
                            e.stopPropagation()
                            onVerMais()
                        }}
                    >
                        Ver detalhes
                    </button>
                </div>
            </div>
        </article>
    )
}

export default ProjetoCard
