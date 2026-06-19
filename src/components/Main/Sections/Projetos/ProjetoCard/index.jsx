import languages from '@data/languages.json'
import { useScrollAnimation } from '@hooks/useScrollAnimation'
import { formatPeriod } from '@utils/date'
import { getStackEmoji } from '@utils/project'
import { FaGithub } from 'react-icons/fa'
import styles from './ProjetoCard.module.css'

const ProjetoCard = ({ projeto, onVerMais, animationDelay = 0, featured = false }) => {
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
            {featured && (
                <span className={styles.featuredLabel}>Projeto em destaque</span>
            )}

            <div className={styles.top}>
                <h3>{projeto.title}</h3>

                {projeto.status && (
                    <span className={`${styles.status} ${styles[statusClass]}`}>
                        {projeto.status}
                    </span>
                )}
            </div>

            <div className={styles.imageWrapper}>
                <img
                    src={projeto.image}
                    alt={projeto.title}
                    className={styles.projetoImage}
                />
            </div>

            <div className={styles.contentSection}>
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
                    {projeto.languages.map((tec, index) => {
                        const normalizedKey = tec.toLowerCase().replace(/\s+/g, '')
                        const iconUrl = languages[normalizedKey]

                        return (
                            <li key={index}>
                                {iconUrl && (
                                    <img
                                        src={iconUrl}
                                        alt={tec}
                                        onError={(e) => (e.target.style.display = 'none')}
                                    />
                                )}
                                {tec}
                            </li>
                        )
                    })}
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