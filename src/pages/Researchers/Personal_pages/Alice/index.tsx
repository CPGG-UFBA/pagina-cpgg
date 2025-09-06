import styles from '../researcher.module.css';

export function Alice() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Alice</h1>
      <p className={styles.content}>Página do pesquisador Alice.</p>
    </div>
  );
}