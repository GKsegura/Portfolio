import { useEffect, useState } from 'react'
import styles from './Header.module.css'

const NAV_LINKS = [
    { href: '#sobre', label: 'Sobre', id: 'sobre' },
    { href: '#experiencia', label: 'Experiência', id: 'experiencia' },
    { href: '#formacao', label: 'Formação', id: 'formacao' },
    { href: '#historia', label: 'História', id: 'historia' },
    { href: '#projetos', label: 'Projetos', id: 'projetos' },
    { href: '#contato', label: 'Contato', id: 'contato' },
]

const SECTION_TO_NAV = {
    sobre: 'sobre',
    tecnologias: 'sobre',
    experiencia: 'experiencia',
    formacao: 'formacao',
    historia: 'historia',
    projetos: 'projetos',
    contato: 'contato',
}

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('sobre')

    useEffect(() => {
        if (!isOpen) return
        const handleClickOutside = (e) => {
            if (!e.target.closest('header')) setIsOpen(false)
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [isOpen])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) setIsOpen(false)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        const sections = document.querySelectorAll('section[id]')
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const navId = SECTION_TO_NAV[entry.target.id]
                        if (navId) setActiveSection(navId)
                    }
                })
            },
            { threshold: 0.35 }
        )
        sections.forEach(s => observer.observe(s))
        return () => observer.disconnect()
    }, [])

    const handleNavClick = () => setIsOpen(false)

    return (
        <header className={styles.header}>
            <div className={styles.logo}>&lt;/&gt; José Segura<span className={styles.ponto}>.</span></div>

            <button
                className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ''}`}
                onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen) }}
                aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={isOpen}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
                {NAV_LINKS.map(({ href, label, id }) => (
                    <a
                        key={id}
                        href={href}
                        onClick={handleNavClick}
                        className={activeSection === id ? styles.active : ''}
                    >
                        {label}
                    </a>
                ))}
            </nav>
        </header>
    )
}