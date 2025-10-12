import { useEffect } from 'react'
import { Header } from '../../components/Header/'
import { Footer } from '../../components/Footer/'
import { Middle } from './components/Middle/'
import styles from './Home.module.css'

export function Home() {
  useEffect(() => {
    // Force remove scroll on home page
    const originalOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflow
    const originalPosition = document.body.style.position
    
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    document.body.style.height = '100vh'
    
    return () => {
      document.body.style.overflow = originalOverflow
      document.documentElement.style.overflow = originalHtmlOverflow
      document.body.style.position = originalPosition
      document.body.style.width = ''
      document.body.style.height = ''
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
