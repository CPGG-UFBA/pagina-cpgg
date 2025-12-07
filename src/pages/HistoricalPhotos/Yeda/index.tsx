import styles from './yeda.module.css'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import { BackButtonPhotos } from '../../../components/BackButtonPhotos'
const photo1 = 'https://i.imgur.com/X1NBeAU.jpg'
const photo2 = 'https://i.imgur.com/okukHvA.jpg'


export function Yeda() {
  return (
    <div className={styles.pageContainer}>
      <Header />
      <BackButtonPhotos to="/Photos/HistoricalPhotos" />
      <div className={styles.Yeda}>
          <ul> Professora Yeda </ul>
          <div className={styles.box}>
          <div className={styles.gallery}>
            <div className={styles.photo1}>
              <img src={photo1} alt='Foto1' />
            </div>
            <div className={styles.photo2}>
              <img src={photo2} alt='Foto2' />
            </div>
          </div>
          </div>
        </div>

      <Footer />
    </div>
  )
}
