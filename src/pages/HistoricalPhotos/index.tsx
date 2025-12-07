import styles from './HistoricalPhotos.module.css';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Link } from 'react-router-dom';
import { BackButtonPhotos } from '../../components/BackButtonPhotos';
import earthCorrect from '../../assets/earth-correct.jpg'

export  function HP() {
  return (
      <div className={`${styles.pageContainer} historical-photos-page`}>
      <Header/>
      <BackButtonPhotos />
          <main className={styles.hp}>
              <h1 className={styles.title}>Fotos Históricas</h1>

              <div className={styles.container}>
                  <Link className={styles.card} to="/Photos/HistoricalPhotos/LatinAmerican">
                      <div className={styles.Latin}>
                          <h2>1a. Conferência Latino-americana de Geofísica</h2>
                      </div>
                  </Link>

                  <Link className={styles.card} to="/Photos/HistoricalPhotos/ICG">
                      <div className={styles.ICG}>
                          <h2>2o. Congresso Internacional de Geofísica</h2>
                      </div>
                  </Link>

                  <Link className={styles.card} to="/Photos/HistoricalPhotos/Yeda">
                      <div className={styles.Yeda}>
                          <h2>Professora Yeda</h2>
                      </div>
                  </Link>

                  <Link className={styles.card} to="/Photos/HistoricalPhotos/BlockE">
                      <div className={styles.BlockE}>
                          <h2>Inauguração da Sede do CPGG</h2>
                      </div>
                  </Link>
              </div>
          </main>
          <Footer/>
      </div>
  )
}