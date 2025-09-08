import styles from './Spaces.module.css';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import earth from '../../assets/earth-photos.jpg'

export  function Spaces() {
  return (
      <>
      <Header/>
          <div className={styles.spaces}>
              <h1 className={styles.title}>Espaços e Reservas </h1>

              <div className={styles.container}>
                  <a className={styles.card} href="Spaces/Auditory">
                      <div className={styles.auditory}>
                          <h2>Auditório</h2>
                      </div>
                  </a>

                  <a className={styles.card} href="Spaces/MeetingRoom">
                      <div className={styles.meetingroom}>
                          <h2>Sala de reuniões</h2>
                      </div>
                  </a>
                  <div className={styles.staticFigure} aria-hidden="true">
                    <img src={earth} alt="Figura de fundo: planeta Terra" />
                  </div>
              </div>
          </div>
         
          <Footer/>
      </>
  )
}