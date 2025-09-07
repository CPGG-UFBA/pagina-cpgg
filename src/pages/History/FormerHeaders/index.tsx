import styles from './former.module.css';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

export function Former() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Ex-Diretores</h1>
        <p className={styles.description}>Informações sobre ex-diretores.</p>
      </div>
      <Footer />
    </>
  )
}