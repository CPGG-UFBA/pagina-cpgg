import { useLanguage } from '@/contexts/LanguageContext';
import styles from './LanguageSelector.module.css';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  
  console.log('LanguageSelector renderizando, idioma atual:', language);

  return (
    <div className={styles.languageSelector} style={{ background: 'rgba(255, 0, 0, 0.3)', minWidth: '120px', minHeight: '50px' }}>
      <button
        onClick={() => {
          console.log('Clicou em PT');
          setLanguage('pt');
        }}
        className={`${styles.flagButton} ${language === 'pt' ? styles.active : ''}`}
        aria-label="Português"
        title="Português"
        style={{ fontSize: '24px' }}
      >
        🇧🇷
      </button>
      <button
        onClick={() => {
          console.log('Clicou em EN');
          setLanguage('en');
        }}
        className={`${styles.flagButton} ${language === 'en' ? styles.active : ''}`}
        aria-label="English"
        title="English"
        style={{ fontSize: '24px' }}
      >
        🇺🇸
      </button>
    </div>
  );
}