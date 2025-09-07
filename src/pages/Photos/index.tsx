import styles from './Photos.module.css';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import earth from '../../components/Figures/earth3.png'

export  function Photos() {
  return (
      <>
      <Header/>
          <div className={styles.photos}>
              <h1 className={styles.title}>Fotos de eventos </h1>

              <div className={styles.container}>
                  <a className={styles.card} href="Photos/HistoricalPhotos">
                      <div className={styles.historical}>
                          <h2>Históricas</h2>
                      </div>
                  </a>

                  <a className={styles.card} href="Photos/Years">
                      <div className={styles.fifthy}>
                          <h2> 50 anos - Pós-Graduação em Geofísica</h2>
                      </div>
                  </a>
                  <a className={styles.card} href="Photos/FirstMeeting">
                      <div className={styles.reopen}>
                          <h2> Primeira reunião geral- retorno das atividades do CPGG</h2>
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