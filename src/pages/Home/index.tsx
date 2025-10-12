import { useEffect } from 'react'
import { Header } from '../../components/Header/'
import { Footer } from '../../components/Footer/'
import { Middle } from './components/Middle/'
import styles from './Home.module.css'

export function Home() {
  useEffect(() => {
    // Prevent body scroll only on home page
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    
    return () => {
      // Restore scroll when leaving home page
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [])

  return (
    <div className={styles.Container}>
      <Header />
      <Middle />
      <Footer />
    </div>
  )
}
