import educacaoData from '@data/educacao.json'
import { useScrollAnimation } from '@hooks/useScrollAnimation'
import { formatMonthRange } from '@utils/date'
import styles from './Formacao.module.css'

const Formacao = () => {
    const sectionRef = useScrollAnimation({ threshold: 0.05 })

    return (
        <section ref={sectionRef} className={`${styles.formacao} reveal`} id="formacao">
            <h2>{educacaoData.titulo}</h2>

            <ul className={styles.timeline}>
                {educacaoData.itens.map((item, i) => (
                    <li key={i}>
                        <div className={styles.metaRow}>
                            {item.inicio && (
                                <span className={styles.periodo}>{formatMonthRange(item.inicio, item.fim)}</span>
                            )}
                            <span className={styles.status}>{item.status}</span>
                        </div>
                        <h3>{item.curso}</h3>
                        <p>{item.instituicao}</p>
                        {item.detalhe && (
                            <p className={styles.detalhe}>{item.detalhe}</p>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Formacao
