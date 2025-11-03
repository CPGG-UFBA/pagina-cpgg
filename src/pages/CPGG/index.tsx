import styles from './CPGG.module.css'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import earth from '../../components/Figures/earth-new.jpg'
import { getTotalResearchersCount } from '../../data/researchers'
import { useLanguage } from '@/contexts/LanguageContext'

export function CPGG() {
  const totalResearchers = getTotalResearchersCount()
  const { t } = useLanguage()
  
  return (
    <div className={styles.pageContainer} style={{ overflow: 'hidden', height: '100vh' }}>
      <Header />
      <main className={styles.cpgg} style={{ overflow: 'hidden' }}>
        <div className={styles.Title} >
          <ul>{t('cpgg.title')}</ul>
          <div className={styles.box}>
          <p>
              {t('cpgg.description1')}
            </p>
            <br></br>
            <p>
              {t('cpgg.description2')}
            </p>
            <br></br>
            <p>
              {t('cpgg.description3')}
           </p>
            <br></br>
            <p> 
              {t('cpgg.description4').replace('{count}', totalResearchers.toString())}
             </p>
            
            <div className={styles.box1}>
              <h4 className={styles.legend1}>{t('cpgg.legend1')}</h4>
            </div>
            <div className={styles.box2}>
              <h4 className={styles.legend2}>{t('cpgg.legend2')}</h4>
            </div>
            <div className={styles.box3}>
              <h4 className={styles.legend3}>{t('cpgg.legend3')}</h4>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

