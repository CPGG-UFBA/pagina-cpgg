import { NavLink } from 'react-router-dom'
import { HomeButton } from '../../components/HomeButton'
import styles from './adm.module.css'
import { useLanguage } from '@/contexts/LanguageContext'
const logocpgg = 'https://i.imgur.com/6HRTVzo.png';

export function Adm() {
  const { t } = useLanguage();
  
  return (
    <div className={styles.adm}>
      <HomeButton />
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logocpgg} alt="CPGG" />
        </div>
        <div className={styles.title}>
          <h1>{t('adm.title')}</h1>
          <p>{t('adm.subtitle')}</p>
        </div>
        
        <div className={styles.optionsContainer}>
          <NavLink to="/adm/ti" className={styles.optionCard}>
            <div className={styles.cardContent}>
              <h2>{t('adm.ti')}</h2>
              <p>{t('adm.tiAccess')}</p>
            </div>
          </NavLink>
          
          <NavLink to="/adm/secretaria" className={styles.optionCard}>
            <div className={styles.cardContent}>
              <h2>{t('adm.secretary')}</h2>
              <p>{t('adm.secretaryAccess')}</p>
            </div>
          </NavLink>
          
          <NavLink to="/adm/coordenacao" className={styles.optionCard}>
            <div className={styles.cardContent}>
              <h2>{t('adm.coordination')}</h2>
              <p>{t('adm.coordinationAccess')}</p>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  )
}