import styles from './Production.module.css';
import { useLanguage } from '@/contexts/LanguageContext';

export function Production() {
  const { t } = useLanguage();
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('production.title')}</h1>
      <p className={styles.content}>{t('production.content')}</p>
    </div>
  );
}