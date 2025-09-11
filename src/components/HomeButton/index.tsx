import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import styles from './HomeButton.module.css';

export function HomeButton() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <button onClick={handleGoHome} className={styles.homeButton} title="Voltar para Home">
      <ArrowLeft size={20} />
      <span>Voltar para Home</span>
    </button>
  );
}