import experienciaData from '@data/experiencia.json'
import { useScrollAnimation } from '@hooks/useScrollAnimation'
import { formatMonthRange } from '@utils/date'
import styles from './Experiencia.module.css'

const Experiencia = () => {
    const sectionRef = useScrollAnimation({ threshold: 0.05 })

    return (
        <section ref={sectionRef} className={`${styles.experiencia} reveal`} id="experiencia">
            <h2><span className={styles.index}>02 //</span> {experienciaData.titulo}</h2>

            <ul className={styles.timeline}>
                {experienciaData.itens.map((item, i) => (
                    <li key={i}>
                        <span className={styles.periodo}>{formatMonthRange(item.inicio, item.fim)}</span>
                        <h3>{item.cargo}</h3>
                        <p>{item.empresa} · {item.local}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Experiencia
