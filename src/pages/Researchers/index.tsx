import styles from './Researchers.module.css';

export function Researchers() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pesquisadores</h1>
      <p className={styles.content}>Lista de pesquisadores.</p>
    </div>
  )
}