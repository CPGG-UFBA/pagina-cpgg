import { Header } from '../../components/Header/'
import { Footer } from '../../components/Footer/'
import { Middle } from './components/Middle/'
import styles from './Home.module.css'

export function Home() {
  return (
    <div className={styles.Container} style={{ overflow: 'hidden', height: '100vh' }}>
      <Header />
      <main className={`middle ${styles.middle}`} style={{ overflow: 'hidden' }}>
        <Middle />
      </main>
      <Footer />
    </div>
  )
}
