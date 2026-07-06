import sobreData from '@data/sobre.json'
import { useScrollAnimation } from '@hooks/useScrollAnimation'
import styles from './Sobre.module.css'

const urlTechnologies = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/'

const Sobre = () => {
    const introRef = useScrollAnimation({ threshold: 0.05 })
    const techRef = useScrollAnimation({ threshold: 0.05 })

    const fichaTecnica = [
        ...sobreData.intro.fichaTecnica,
        { label: 'Stack', valor: sobreData.tecnologias.lista.map(tech => tech.nome).join(' · ') },
    ]

    const promptLabel = 'visitante@portfolio:~$'
    const terminalLines = [
        { type: 'cmd', text: 'whoami' },
        { type: 'out', text: `${sobreData.intro.nome}, dev back-end` },
        { type: 'cmd', text: 'cat foco.txt' },
        { type: 'out', text: 'APIs REST, automação de processos e integração de dados' },
    ]

    return (
        <>
            <section ref={introRef} className={`${styles.intro} reveal`} id="sobre">
                <div className={styles.introContainer}>
                    <div className={styles.textContent}>
                        <h1>
                            Olá, eu sou o <span className={styles.highlight}>{sobreData.intro.nome}</span>
                        </h1>

                        {sobreData.intro.subtitulo && (
                            <p className={styles.subtitulo}>{sobreData.intro.subtitulo}</p>
                        )}

                        <ul className={styles.factList}>
                            {fichaTecnica.map(item => (
                                <li key={item.label}>
                                    <span className={styles.factLabel}>{item.label}</span>
                                    <span className={styles.factValue}>{item.valor}</span>
                                </li>
                            ))}
                        </ul>

                        <div className={styles.description}>
                            {sobreData.intro.paragrafos.map(paragrafo => (
                                <p key={paragrafo.id} dangerouslySetInnerHTML={{ __html: paragrafo.texto }} />
                            ))}
                        </div>

                        <div className={styles.actions}>
                            <a href={sobreData.intro.cta.linkHref} className={styles.actionPrimary}>
                                Vamos conversar
                            </a>
                            <a href={sobreData.intro.curriculo.linkHref} download className={styles.actionSecondary}>
                                Baixar currículo
                            </a>
                        </div>
                    </div>

                    <div className={styles.media}>
                        <div className={styles.imgDev}>
                            <img src="https://github.com/GKsegura.png" alt="Foto de perfil do José Segura" />
                        </div>

                        <div className={styles.terminal} aria-hidden="true">
                            <div className={styles.terminalBar}>
                                <span className={styles.terminalDots}>
                                    <span className={styles.dotRed} />
                                    <span className={styles.dotYellow} />
                                    <span className={styles.dotGreen} />
                                </span>
                                <span className={styles.terminalTitle}>~/portfolio — bash</span>
                            </div>
                            <div className={styles.terminalBody}>
                                {terminalLines.map((line, i) => (
                                    line.type === 'cmd'
                                        ? <p key={i}><span className={styles.prompt}>{promptLabel}</span> {line.text}</p>
                                        : <p key={i} className={styles.terminalOutput}>{'>'} {line.text}</p>
                                ))}
                                <p><span className={styles.prompt}>{promptLabel}</span> <span className={styles.cursor} /></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section ref={techRef} className={`${styles.tecnologias} reveal`} id='tecnologias'>
                <h2>{sobreData.tecnologias.titulo}</h2>
                <ul className={styles.tecnologiasContainer}>
                    {sobreData.tecnologias.lista.map(tech => (
                        <li key={tech.nome}>
                            <img src={`${urlTechnologies}${tech.icone}`} alt={tech.nome} />
                            <span className={styles.techNome}>{tech.nome}</span>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}

export default Sobre