import { Link } from 'react-router-dom'
import styles from './CPGG2.module.css'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import earth from '../../components/Figures/earth-new.jpg'
import { useLanguage } from '@/contexts/LanguageContext'

export function CPGG2() {
  const { t } = useLanguage()
  
  return (
    <div className={styles.pageContainer}>
      <Header />
      <main className={`${styles.cpgg} cpgg`}>
        <div className={styles.Title} >
          <ul>Laboratórios e Reservas</ul>
          
          <div className={styles.requerimentoButton}>
            <Link to="/labs/laiga/reservation-form" className={styles.buttonLink}>
              {t('laiga.requestButton')}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
