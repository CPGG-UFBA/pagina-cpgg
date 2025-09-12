import { useLanguage } from '@/contexts/LanguageContext';
import styles from './LanguageSelector.module.css';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={styles.languageSelector}>
      <button
        onClick={() => setLanguage('pt')}
        className={`${styles.flagButton} ${language === 'pt' ? styles.active : ''}`}
        aria-label="Português"
        title="Português"
      >
        🇧🇷
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`${styles.flagButton} ${language === 'en' ? styles.active : ''}`}
        aria-label="English"
        title="English"
      >
        🇺🇸
      </button>
    </div>
  );
}