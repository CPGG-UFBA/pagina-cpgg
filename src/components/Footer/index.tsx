import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.image} />
      <div className={styles.bar}>
        <nav>
          <a href='http://www.cpgg.ufba.br' target="_blank" >Página Antiga-CPGG</a>
          <a href='https://www.linkedin.com/in/cpgg-centro-de-pesquisa-94768a304/' target="_blank" >Linkedin</a>
          <a href='http://www.pggeofisica.ufba.br/' target="_blank">Pós-Graduação em Geofísica</a>
          <a href='https://pggeologia.ufba.br/' target="_blank" >Pós-Graduação em Geologia</a>
        </nav>
      </div>
    </footer>
  )
}
