import styles from '../Recipes.module.css';

export function Calendars() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Calendários</h1>
      <p className={styles.content}>Calendários das receitas.</p>
    </div>
  );
}