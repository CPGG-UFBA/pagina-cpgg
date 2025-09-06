import styles from './Photos.module.css';

export function Photos() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Fotos</h1>
      <p className={styles.content}>Galeria de fotos.</p>
    </div>
  );
}