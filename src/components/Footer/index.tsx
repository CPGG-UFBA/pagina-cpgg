import styles from './Footer.module.css'
import { Linkedin, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.image} />
      <div className={styles.bar}>
        <nav>
          <a href='http://www.cpgg.ufba.br' target="_blank" >Página Antiga-CPGG</a>
          <a href='https://www.linkedin.com/in/cpgg-centro-de-pesquisa-94768a304/' target="_blank" className={styles.socialLink} rel="noopener noreferrer">
            <Linkedin size={16} />
            Linkedin
          </a>
          <a
            href='https://www.instagram.com/cpgg.ufba'
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Instagram do CPGG"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              window.open('https://www.instagram.com/cpgg.ufba', '_blank', 'noopener,noreferrer');
            }}
          >
            <Instagram size={16} />
            Instagram
          </a>
          <a href='http://www.pggeofisica.ufba.br/' target="_blank">Pós-Graduação em Geofísica</a>
          <a href='https://pggeologia.ufba.br/' target="_blank" >Pós-Graduação em Geologia</a>
        </nav>
        <div className={styles.copyright}>
          © Todos os direitos reservados
        </div>
      </div>
    </footer>
  )
}
