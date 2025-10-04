import styles from './Recipes.module.css';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
const earth = 'https://i.imgur.com/z6pTgZ1.jpg'

export  function Recipes() {
  return (
      <>
      <Header/>
          <div className={styles.recipes}>
              <h1 className={styles.title}>Receitas </h1>

              <div className={styles.container}>
                  <a className={styles.card} href="https://raw.githubusercontent.com/CPGG-UFBA/Documentos_WEB_CPGG/main/marcas.zip">
                      <div className={styles.logos}>
                          <h2>Marcas do CPGG</h2>
                      </div>
                  </a>

                  <a className={styles.card} href="recipes/Calendars">
                      <div className={styles.calendars}>
                          <h2> Calendários</h2>
                      </div>
                  </a>
                  <a className={styles.card} href="https://raw.githubusercontent.com/CPGG-UFBA/Documentos_WEB_CPGG/main/modelo-cpgg.ppt">
                      <div className={styles.power}>
                          <h2> Power Point para apresentações</h2>
                      </div>
                  </a>
                  <a className={styles.card} href="https://raw.githubusercontent.com/CPGG-UFBA/Documentos_WEB_CPGG/main/slide.zip">
                      <div className={styles.latex}>
                          <h2> Latex-modelo para slides</h2>
                      </div>
                  </a>
                  <a className={styles.card} href="https://drive.google.com/file/d/1LUCRVgZod5710Kchs_sHzG0nrjgxqNKJ/view?usp=drive_link">
                      <div className={styles.gmt}>
                          <h2> GMT-códigos</h2>
                      </div>
                  </a>
                  <a className={styles.card} href="/src/assets/PDF/Deliberacao_normativa_2_2023.pdf">
                      <div className={styles.python}>
                          <h2> Python-códigos</h2>
                      </div>
                  </a>

              </div>
          </div>
          <div className={styles.footerRecipes}>
            <Footer/>
          </div>
      </>
  )
}