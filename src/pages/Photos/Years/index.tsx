import styles from './fiftiethyears.module.css'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'

// Fotos dos 50 anos serão adicionadas em breve

export function Years() {
  return (
    <>
      <Header />
      <div className={styles.Years}>
          <ul> 50 anos do Programa de Pós-Graduação em Geofísica </ul>
          <div className={styles.box}>
          <div className={styles.gallery}>
            <div className={styles.photoPlaceholder}>
              <p>As fotos dos 50 anos serão adicionadas em breve.</p>
            </div>
          </div>
          </div>
        </div>

      <Footer />
    </>
  )
}
