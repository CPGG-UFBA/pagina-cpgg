import styles from './Spaces.module.css';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import earthImage from '../../assets/earth-imgur.png';
import { useLanguage } from '@/contexts/LanguageContext';

export  function Spaces() {
  const { t } = useLanguage();
  
  return (
    <div className={styles.pageContainer}>
      <Header/>
      <main className={styles.spaces}>
        <h1 className={styles.title}>{t('spaces.title')}</h1>

        <div className={styles.container}>
          <a className={styles.card} href="Spaces/Auditory">
            <div className={styles.auditory}>
              <h2>{t('spaces.auditory')}</h2>
            </div>
          </a>

          <a className={styles.card} href="Spaces/MeetingRoom">
            <div className={styles.meetingroom}>
              <h2>{t('spaces.meetingRoom')}</h2>
            </div>
          </a>
        </div>
      </main>
      <Footer/>
    </div>
  )
}