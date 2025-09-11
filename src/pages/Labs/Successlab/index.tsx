import { HomeButton } from '../../../components/HomeButton';
import styles from '../Labs.module.css';

export function Successlab() {
  return (
    <div className={styles.container}>
      <HomeButton />
      <h1 className={styles.title}>Reserva de Laboratório Realizada!</h1>
      <p className={styles.content}>Sua reserva do laboratório foi confirmada com sucesso.</p>
    </div>
  );
}