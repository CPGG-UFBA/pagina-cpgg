import { HomeButton } from '../../../components/HomeButton';
import styles from '../Labs.module.css';
import { useLanguage } from '@/contexts/LanguageContext';

export function Successlab() {
  const { t } = useLanguage();
  
  return (
    <div className={styles.container}>
      <HomeButton />
      <h1 className={styles.title}>{t('labSuccess.title')}</h1>
      <p className={styles.content}>{t('labSuccess.message')}</p>
    </div>
  );
}