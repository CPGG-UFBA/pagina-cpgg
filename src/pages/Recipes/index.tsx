import styles from './Recipes.module.css';

export function Recipes() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Receitas</h1>
      <p className={styles.content}>Página de receitas.</p>
    </div>
  );
}