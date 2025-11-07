import { useLanguage } from '@/contexts/LanguageContext';
import styles from './LanguageSelector.module.css';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  
  console.log('LanguageSelector renderizando, idioma atual:', language);

  return (
    <div className={styles.languageSelector} style={{ background: 'rgba(255, 0, 0, 0.3)' }}>
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