import styles from './calendars.module.css';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import earth from ='https://imgur.com/z6pTgZ1'

export  function Calendars() {
  return (
      <>
      <Header/>
          <div className={styles.calendars}>
              <h1 className={styles.title}>Receitas </h1>

              <div className={styles.container}>
                  <a className={styles.card} href="https://drive.google.com/file/d/1HCYNtR6-Su2mbSAbbMKh8rYgJIIsYOWk/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                      <div className={styles.vintecinco}>
                          <h2>Calendário de 2025</h2>
                      </div>
                  </a>

                  <a className={styles.card} href="https://drive.google.com/file/d/1UbaOdBxcqlvDY3v_a08b9rgEGahxRf0_/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                      <div className={styles.vintequatro}>
                          <h2> Calendário de 2024</h2>
                      </div>
                  </a>
                  <a className={styles.card} href="https://drive.google.com/file/d/11UYvunAfYl3oij3toYaIY8jJzsEE-bcD/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                      <div className={styles.vintetres}>
                          <h2> Calendário de 2023</h2>
                      </div>
                  </a>
                  <a className={styles.card} href="https://drive.google.com/file/d/1plx9hvCJSz-_81HxMb72BIWaI7ZyU17q/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                      <div className={styles.vintedois}>
                          <h2> Calendário de 2022</h2>
                      </div>
                  </a>
                  <a className={styles.card} href="https://drive.google.com/file/d/1suCYamkdt0flvMuuYzy3j4of8WUKrD3k/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                      <div className={styles.vinteum}>
                          <h2> Calendário de 2021</h2>
                      </div>
                  </a>
                  <a className={styles.card} href="https://drive.google.com/file/d/1H-e1JFNm2dthU8porSI8bn-S5fpRIF3h/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                      <div className={styles.vinte}>
                          <h2> Calendário de 2020</h2>
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