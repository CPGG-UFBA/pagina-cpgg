import styles from '../Spaces.module.css';

export function Auditory() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Auditório</h1>
      <p className={styles.content}>Informações sobre o auditório.</p>
    </div>
  );
}