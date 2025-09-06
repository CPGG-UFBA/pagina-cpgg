import styles from './HistoricalPhotos.module.css';

export function HP() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Fotos Históricas</h1>
      <p className={styles.content}>Coleção de fotos históricas.</p>
    </div>
  );
}