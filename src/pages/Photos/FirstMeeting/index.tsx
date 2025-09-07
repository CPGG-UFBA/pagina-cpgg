import styles from './firstmeeting.module.css'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'

// FirstMeeting photos will be added when available



export function FirstMeeting() {
  return (
    <>
      <Header />
      <div className={styles.FirstMeeting}>
          <ul> Primeira reunião geral de retorno do CPGG (março de 2024)</ul>
          <div className={styles.box}>
          <div className={styles.gallery}>
            <div className={styles.photoPlaceholder}>
              <p>Fotos da primeira reunião geral de retorno do CPGG serão adicionadas em breve.</p>
            </div>
          </div>
          </div>
        </div>

      <Footer />
    </>
  )
}
