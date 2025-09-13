import styles from './History.module.css';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
const earth = 'https://i.imgur.com/z6pTgZ1.png'

export  function History() {
  return (
      <>
      <Header/>
          <div className={styles.history}>
              <h1 className={styles.title}>Nossa História </h1>

              <div className={styles.container}>
                  <a className={styles.card} href="history/Former">
                      <div className={styles.headers}>
                          <h2>Coordenadores do CPGG</h2>
                      </div>
                  </a>

                  <a className={styles.card} href="https://drive.google.com/file/d/1_9rqkr55S-9kwJRLZcEn0TWXzd6bMTSN/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                      <div className={styles.document}>
                          <h2> A História do CPGG (por Dr. Olivar Lima)</h2>
                      </div>
                  </a>

                  <div className={styles.staticFigure}>
                    <img src={earth} alt='Terra' />
                  </div>
              </div>
          </div>
         
          <Footer/>
      </>
  )
}