import styles from './Spaces.module.css';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import earthImage from '../../assets/earth-imgur.png';

export  function Spaces() {
  return (
    <div className={styles.pageContainer}>
      <Header/>
      <main className={styles.spaces}>
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
          <div className={styles.staticFigure}>
            <img src={earthImage} alt='Terra' />
         </div>
        </div>
      </main>
      <Footer/>
    </div>
  )
}