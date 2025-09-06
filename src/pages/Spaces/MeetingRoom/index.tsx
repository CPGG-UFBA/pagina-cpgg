import styles from '../Spaces.module.css';

export function MeetingRoom() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sala de Reunião</h1>
      <p className={styles.content}>Informações sobre a sala de reunião.</p>
    </div>
  );
}