import historiaData from '@data/historia.json'
import { useScrollAnimation } from '@hooks/useScrollAnimation'
import styles from './Historia.module.css'

const Historia = () => {
    const sectionRef = useScrollAnimation({ threshold: 0.05 })

    return (
        <section ref={sectionRef} className={`${styles.historia} reveal`} id="historia">
            <span className={styles.kicker}>$ cat historia.txt</span>
            <h2>{historiaData.titulo}</h2>

            <div className={styles.prose}>
                {historiaData.paragrafos.map(paragrafo => (
                    <p key={paragrafo.id}>{paragrafo.texto}</p>
                ))}
            </div>
        </section>
    )
}

export default Historia
