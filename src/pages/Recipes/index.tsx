import styles from './recipes.module.css';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import earth from ='https://imgur.com/z6pTgZ1'

export  function Recipes() {
  return (
      <>
      <Header/>
          <div className={styles.recipes}>
              <h1 className={styles.title}>Receitas </h1>

              <div className={styles.container}>
                  <a className={styles.card} href="https://drive.google.com/file/d/16SeK8KT4ObIwUuOviBSdicowrfQ5eRrx/view?usp=drive_link">
                      <div className={styles.logos}>
                          <h2>Marcas do CPGG</h2>
                      </div>
                  </a>

                  <a className={styles.card} href="recipes/Calendars">
                      <div className={styles.calendars}>
                          <h2> Calendários</h2>
                      </div>
                  </a>
                  <a className={styles.card} href="https://docs.google.com/presentation/d/1-k457ENHYhMNecgI2nmW9fFJWUolk7qq/edit?usp=drive_link&ouid=118013741197621606781&rtpof=true&sd=true">
                      <div className={styles.power}>
                          <h2> Power Point para apresentações</h2>
                      </div>
                  </a>
                  <a className={styles.card} href="https://drive.google.com/file/d/1mGcNgXecjEIS_A9FuppyDv8ak-m85fIg/view?usp=drive_link">
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

                  <div className={styles.staticFigure}>
                  <img src={earth} alt='Terra' />
                  </div>
              </div>
          </div>
          <Footer/>
      </>
  )
}