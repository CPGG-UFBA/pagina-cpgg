import styles from './Success.module.css';

export function Success() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Reserva Realizada com Sucesso!</h1>
      <p className={styles.content}>Sua reserva foi confirmada.</p>
    </div>
  );
}