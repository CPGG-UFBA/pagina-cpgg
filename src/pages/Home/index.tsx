import { Header } from '../../components/Header/'
import { Footer } from '../../components/Footer/'
import { Middle } from './components/Middle/'
import styles from './Home.module.css'

export function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <Middle />
      <Footer />
    </div>
  )
}
