import styles from './Technicians.module.css';

export function Technicians() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Técnicos</h1>
      <p className={styles.content}>Lista de técnicos.</p>
    </div>
  );
}