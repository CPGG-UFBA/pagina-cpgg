import styles from './History.module.css';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import earth from '../../components/Figures/earth-new.jpg';
import { useLanguage } from '@/contexts/LanguageContext';

export  function History() {
  const { t } = useLanguage();
  
  return (
      <>
      <Header/>
          <div className={styles.history}>
              <h1 className={styles.title}>{t('history.title')}</h1>

              <div className={styles.container}>
                  <a className={styles.card} href="history/Former">
                      <div className={styles.headers}>
                          <h2>{t('history.coordinators')}</h2>
                      </div>
                  </a>

                  <a className={styles.card} href="https://raw.githubusercontent.com/CPGG-UFBA/Documentos_WEB_CPGG/main/PDF_history.pdf" target="_blank" rel="noopener noreferrer">
                      <div className={styles.document}>
                          <h2>{t('history.cpggHistory')}</h2>
                      </div>
                  </a>

              </div>
          </div>

          <div className={styles.staticFigure}>
            <img src={earth} alt="Terra" />
          </div>
         
          <Footer/>
      </>
  )
}