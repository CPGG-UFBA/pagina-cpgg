import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
        <div className={styles.linkContainer}>
          <a 
            href="https://www.linkedin.com/in/cpgg-centro-de-pesquisa-94768a304/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.link}
          >
            Linkedin
          </a>
          <a 
            href="http://www.pggeofisica.ufba.br/" 
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Pós-Graduação em Geofísica
          </a>
          <a 
            href="https://pggeologia.ufba.br/" 
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Pós-Graduação em Geologia
          </a>
        </div>
      </nav>
    </footer>
  )
}