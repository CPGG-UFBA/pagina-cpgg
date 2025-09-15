import styles from './HistoricalPhotos.module.css';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import earthCorrect from '../../assets/earth-correct.jpg'

export  function HP() {
  return (
      <>
      <Header/>
          <div className={styles.hp}>
              <h1 className={styles.title}>Fotos Históricas </h1>


              <a className={styles.card} href="HistoricalPhotos/LatinAmerican">
                      <div className={styles.Latin}>
                          <h2>1a. Conferência Latino-americana de Geofísica </h2>
                      </div>
                  </a>

              <div className={styles.container}>
                  <a className={styles.card} href="HistoricalPhotos/ICG">
                      <div className={styles.ICG}>
                          <h2>2o. Congresso Internacional de Geofísica</h2>
                      </div>
                  </a>

                 

                  <a className={styles.card} href="HistoricalPhotos/Yeda">
                      <div className={styles.Yeda}>
                          <h2> Professora Yeda</h2>
                      </div>
                  </a>
                  <a className={styles.card} href="HistoricalPhotos/BlockE">
                      <div className={styles.BlockE}>
                          <h2> Inauguração da Sede do CPGG</h2>
                      </div>
                  </a>
                  <a className={styles.card} href="HistoricalPhotos/Others">
                      <div className={styles.others}>
                          <h2> Outras</h2>
                      </div>
                  </a>
              </div>
          </div>
          <Footer/>
      </>
  )
}