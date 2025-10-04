import styles from './laiga.module.css'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import earth from '../../../assets/earth-imgur.png'
import { useLanguage } from '@/contexts/LanguageContext'

export function Laiga() {
  const { t } = useLanguage()
  
  return (
    <>
      <Header />
      <div className={styles.laiga}>
        <div className={styles.Title} >
          <ul>{t('laiga.title')}</ul>
          <a>{t('laiga.subtitle')}</a>
          <div className={styles.box}>
          <p>
              {t('laiga.description1')}
            </p>
            <br></br>
            <p>
              {t('laiga.description2')}
            </p>
            <br></br>
            <p>
              {t('laiga.description3')}
            </p>
            <br></br>
            <p>
              {t('laiga.description4')}
           </p>
            <br></br>
            <p> 
              {t('laiga.description5')}
            </p>

             <nav>
              <a href="https://pnipe.mcti.gov.br/search?term=Laiga" target="_blank" className={styles.purpleLink}>{t('laiga.pnipeSite')}</a>
            </nav>
            <p> 
              {t('laiga.availability')}
            </p>
           <br></br>
           <b className={styles.purpleText}>{t('laiga.chief')}</b>
           <span>{t('laiga.chiefName')}</span> 
           
           <div className={styles.requerimentoButton}>
             <a href="/Labs/Laiga/ReservationForm" className={styles.buttonLink}>
               {t('laiga.requestButton')}
             </a>
           </div>

            <div className={styles.box1}>
              <h4 className={styles.legend1}>{t('laiga.room1')}</h4>
            </div>
            <div className={styles.box2}>
              <h4 className={styles.legend2}>{t('laiga.room2')}</h4>
            </div>
            <div className={styles.box3}>
              <h4 className={styles.legend3}>{t('laiga.room3')}</h4>
            </div>
            <div className={styles.box4}>
              <h4 className={styles.legend4}>{t('laiga.room4')}</h4>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}