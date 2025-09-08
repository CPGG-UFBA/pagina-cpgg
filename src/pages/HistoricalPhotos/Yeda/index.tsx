import styles from './yeda.module.css'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import photo1 from ='https://imgur.com/X1NBeAU'
import photo2 from ='https://imgur.com/okukHvA'


export function Yeda() {
  return (
    <>
      <Header />
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
    </>
  )
}
