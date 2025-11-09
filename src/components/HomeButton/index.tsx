import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import styles from './HomeButton.module.css';
import { useLanguage } from '@/contexts/LanguageContext';

export function HomeButton() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <button onClick={handleGoHome} className={styles.homeButton} title={t('button.backToHome')}>
      <ArrowLeft size={20} />
      <span>{t('button.backToHome')}</span>
    </button>
  );
}