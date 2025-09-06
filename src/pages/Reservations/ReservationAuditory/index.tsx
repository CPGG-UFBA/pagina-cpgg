import styles from './ReservationAuditory.module.css';

export function RA() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Reserva do Auditório</h1>
      <p className={styles.content}>Formulário de reserva do auditório.</p>
    </div>
  );
}