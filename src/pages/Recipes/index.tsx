import { Link } from 'react-router-dom';
import styles from './Recipes.module.css';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
const earth = 'https://i.imgur.com/z6pTgZ1.jpg'

export  function Recipes() {
  return (
      <>
      <Header/>
          <div className={`${styles.recipes} recipes`}>
              <h1 className={styles.title}>Receitas </h1>

              <div className={styles.container}>
                  <a className={styles.logos} href="https://raw.githubusercontent.com/CPGG-UFBA/Documentos_WEB_CPGG/main/marcas.zip">
                      <h2>Marcas do CPGG</h2>
                  </a>

                  <Link className={styles.calendars} to="/recipes/calendars">
                      <h2> Calendários</h2>
                  </Link>
                  
                  <a className={styles.power} href="https://raw.githubusercontent.com/CPGG-UFBA/Documentos_WEB_CPGG/main/modelo-cpgg.ppt">
                      <h2> Power Point para apresentações</h2>
                  </a>
                  
                  <a className={styles.latex} href="https://raw.githubusercontent.com/CPGG-UFBA/Documentos_WEB_CPGG/main/slide.zip">
                      <h2> Latex-modelo para slides</h2>
                  </a>
                  
                  <Link className={styles.gmt} to="/recipes/gmt-codes">
                      <h2> GMT-códigos</h2>
                  </Link>
                  
                  <a className={styles.python} href="/src/assets/PDF/Deliberacao_normativa_2_2023.pdf">
                      <h2> Python-códigos</h2>
                  </a>
              </div>
          </div>
          <div className={styles.footerRecipes}>
            <Footer/>
          </div>
      </>
  )
}