import styles from './History.module.css';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import earth from '../../components/Figures/earth-new.jpg'

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



                  <a className={styles.card} href="https://www.dropbox.com/scl/fi/o5nuqrtp4bbmk7ex8ska7/PDF_history.pdf?rlkey=omsdmtx11iaezxpfnphif1gim&st=c6jangfk&dl=0" target="_blank" rel="noopener noreferrer">
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