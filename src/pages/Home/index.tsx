import { Middle } from './components/Middle';
import styles from './Home.module.css';

export function Home() {
  return (
    <div className={styles.container}>
      <Middle />
    </div>
  )
}