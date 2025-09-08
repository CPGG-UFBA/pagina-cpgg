import styles from './Labs.module.css';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import earth from '../../assets/earth-photos.jpg'

export  function Labs() {
  return (
      <>
      <Header/>
          <div className={styles.labs}>
              <h1 className={styles.title}>Laboratórios e Reservas </h1>

              <div className={styles.container}>
                  <a className={styles.card} href="Labs/Laiga">
                      <div className={styles.Laiga}>
                          <h2>LAIGA</h2>
                          <h2>Laboratório Integrado de Geofísica Aplicada</h2>
                      </div>
                  </a>

                  <a className={styles.card} href="Labs/Lamod">
                      <div className={styles.Lamod}>
                      <h2>LAMOD</h2>
                      <h2>Laboratório de Modelagem Física</h2>
                      </div>
                  </a>
                  <a className={styles.card} href="Labs/Lagep">
                      <div className={styles.Lagep}>
                      <h2>LAGEP</h2>
                      <h2>Laboratório de Geofísica do Petróleo</h2>
                      </div>
                  </a>
                  <a className={styles.card} href="Labs/Lab3">
                      <div className={styles.others}>
                      <h2>LAB4</h2>
                      <h2>Laboratório a ser credenciado</h2>
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