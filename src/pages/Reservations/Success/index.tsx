import styles from './Success.module.css'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'

export function Success() {
  const { t } = useLanguage()
  
  return (
    <div className={styles.successContainer}>
      <Header />
      <div className={styles.success}>
          <ul>{t('reservation.successTitle')}</ul>
          <p>{t('reservation.successMessage')}</p>
        </div>
        
      <Footer />
    </div>
  )
}
