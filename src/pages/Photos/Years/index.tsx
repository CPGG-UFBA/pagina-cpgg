import styles from '../Photos.module.css';

export function Years() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Fotos por Ano</h1>
      <p className={styles.content}>Fotos organizadas por ano.</p>
    </div>
  );
}