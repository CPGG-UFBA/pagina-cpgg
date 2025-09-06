import styles from '../Photos.module.css';

export function FirstMeeting() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Primeira Reunião</h1>
      <p className={styles.content}>Fotos da primeira reunião.</p>
    </div>
  );
}