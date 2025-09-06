import styles from './ReservationMeetingRoom.module.css';

export function MR() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Reserva da Sala de Reunião</h1>
      <p className={styles.content}>Formulário de reserva da sala de reunião.</p>
    </div>
  );
}